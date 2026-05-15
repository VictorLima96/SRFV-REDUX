import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { getAdminSupabase } from '@/lib/supabase/admin';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const SAFE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp']);

export async function POST(request: NextRequest) {
  // --- Auth check (cookie-based) ---
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Server storage not configured' }, { status: 500 });
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // --- Parse form data ---
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  const artistName = ((formData.get('artistName') as string) || '').trim();

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!artistName || artistName.length > 50) {
    return NextResponse.json({ error: 'Artist name is required (max 50 chars)' }, { status: 400 });
  }

  // Sanitize artist name (remove special characters that could be used for injection)
  const safeArtistName = artistName.replace(/[^\w\s\-\.áàãâéêíóôõúüçÁÀÃÂÉÊÍÓÔÕÚÜÇ]/gi, '').trim();

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP' }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large. Maximum: 5 MB' }, { status: 400 });
  }

  const rawExt = file.name.split('.').pop()?.toLowerCase() || '';
  const ext = SAFE_EXTENSIONS.has(rawExt) ? rawExt : 'jpg';

  const timestamp = Date.now();
  const safeUserId = user.id.replace(/[^a-zA-Z0-9\-]/g, '');
  const path = `community-arts/${safeUserId}/${timestamp}.${ext}`;

  const admin = getAdminSupabase();
  if (!admin) {
    return NextResponse.json({ error: 'Server storage not configured' }, { status: 500 });
  }

  const { error: uploadError } = await admin.storage
    .from('avatars')
    .upload(path, file, { upsert: false, contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const { data: { publicUrl } } = admin.storage.from('avatars').getPublicUrl(path);

  return NextResponse.json({
    url: publicUrl,
    artistName: safeArtistName,
    message: 'Art submitted successfully! It will appear after review.',
  });
}
