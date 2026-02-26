import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim();
const supabaseSecretKey = (process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? '').trim();

// Security: allowed MIME types and max file size (5 MB)
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_UPLOAD_TYPES = new Set(['avatar', 'banner']);
// Allowed extensions (must match MIME)
const SAFE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp']);

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !supabaseSecretKey) {
    return NextResponse.json({ error: 'Server storage not configured' }, { status: 500 });
  }

  // --- Auth check ---
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const accessToken = authHeader.slice(7);

  // Reject obviously invalid tokens (must be a JWT with 3 parts)
  if (accessToken.split('.').length !== 3) {
    return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey);

  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
  if (authError || !user) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  // --- Parse & validate form data ---
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  const type = (formData.get('type') as string) || 'avatar';

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Validate upload type (prevent path traversal)
  if (!ALLOWED_UPLOAD_TYPES.has(type)) {
    return NextResponse.json({ error: 'Invalid upload type' }, { status: 400 });
  }

  // Validate MIME type
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP' }, { status: 400 });
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large. Maximum: 5 MB' }, { status: 400 });
  }

  // Validate & sanitize extension
  const rawExt = file.name.split('.').pop()?.toLowerCase() || '';
  const ext = SAFE_EXTENSIONS.has(rawExt) ? rawExt : 'jpg';

  // Construct safe path (userId is a UUID from Supabase, type is validated above)
  const path = `${user.id}/${type}.${ext}`;

  // --- Upload with admin privileges ---
  const { error: uploadError } = await supabaseAdmin.storage
    .from('avatars')
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('avatars')
    .getPublicUrl(path);

  return NextResponse.json({ url: `${publicUrl}?t=${Date.now()}` });
}
