'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';

/* ── Inline-editable field ─────────────────────────────────── */
function EditableField({
  label,
  value,
  type = 'text',
  placeholder,
  onSave,
}: {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onSave: (v: string) => Promise<string | null>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setDraft(value); }, [value]);
  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const save = async () => {
    if (draft === value && type !== 'password') { setEditing(false); return; }
    setSaving(true);
    setMsg(null);
    const err = await onSave(draft);
    setSaving(false);
    if (err) {
      setMsg({ ok: false, text: err });
    } else {
      setMsg({ ok: true, text: 'Salvo!' });
      setEditing(false);
      if (type === 'password') setDraft('');
      setTimeout(() => setMsg(null), 3000);
    }
  };

  return (
    <div className="py-4 border-b border-srfv-border last:border-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-srfv-text-muted uppercase tracking-wide">{label}</span>
        {!editing && (
          <button onClick={() => setEditing(true)} className="text-xs text-srfv-primary hover:underline">
            Editar
          </button>
        )}
      </div>
      {editing ? (
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            className="form-input flex-1 !py-2 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && save()}
          />
          <button onClick={save} disabled={saving} className="btn-primary-srfv !px-4 !py-2 text-xs disabled:opacity-50">
            {saving ? '...' : 'Salvar'}
          </button>
          <button onClick={() => { setEditing(false); setDraft(value); setMsg(null); }} className="text-xs text-srfv-text-muted hover:text-white">
            Cancelar
          </button>
        </div>
      ) : (
        <p className="text-sm text-white">
          {type === 'password' ? '••••••••' : value || <span className="text-srfv-text-dim italic">Não definido</span>}
        </p>
      )}
      {msg && (
        <p className={`text-xs mt-1 ${msg.ok ? 'text-green-400' : 'text-red-400'}`}>{msg.text}</p>
      )}
    </div>
  );
}

/* ── Editable textarea for bio ──────────────────────────────── */
function EditableBio({
  value,
  onSave,
}: {
  value: string;
  onSave: (v: string) => Promise<string | null>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => { setDraft(value); }, [value]);

  const save = async () => {
    if (draft === value) { setEditing(false); return; }
    setSaving(true);
    setMsg(null);
    const err = await onSave(draft);
    setSaving(false);
    if (err) {
      setMsg({ ok: false, text: err });
    } else {
      setMsg({ ok: true, text: 'Salvo!' });
      setEditing(false);
      setTimeout(() => setMsg(null), 3000);
    }
  };

  return (
    <div className="py-4 border-b border-srfv-border last:border-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-srfv-text-muted uppercase tracking-wide">Bio</span>
        {!editing && (
          <button onClick={() => setEditing(true)} className="text-xs text-srfv-primary hover:underline">
            Editar
          </button>
        )}
      </div>
      {editing ? (
        <div className="space-y-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={200}
            rows={3}
            className="w-full bg-srfv-bg-darker border border-srfv-border-light text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-srfv-primary transition-colors resize-none"
            placeholder="Conte algo sobre você..."
          />
          <div className="flex gap-2 items-center">
            <span className="text-xs text-srfv-text-dim">{draft.length}/200</span>
            <div className="flex-1" />
            <button onClick={save} disabled={saving} className="btn-primary-srfv !px-4 !py-2 text-xs disabled:opacity-50">
              {saving ? '...' : 'Salvar'}
            </button>
            <button onClick={() => { setEditing(false); setDraft(value); setMsg(null); }} className="text-xs text-srfv-text-muted hover:text-white">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-white whitespace-pre-wrap">
          {value || <span className="text-srfv-text-dim italic">Nenhuma bio definida</span>}
        </p>
      )}
      {msg && (
        <p className={`text-xs mt-1 ${msg.ok ? 'text-green-400' : 'text-red-400'}`}>{msg.text}</p>
      )}
    </div>
  );
}

/* ── Main Profile Page ─────────────────────────────────────── */
export default function ProfilePage() {
  const { user, loading: authLoading, updateProfile, uploadAvatar } = useAuth();
  const router = useRouter();
  const avatarInput = useRef<HTMLInputElement>(null);
  const bannerInput = useRef<HTMLInputElement>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-srfv-text-muted">Carregando...</div>
      </div>
    );
  }

  const meta = user.user_metadata || {};
  const name = meta.name || '';
  const bio = meta.bio || '';
  const avatarUrl = meta.avatar_url || '';
  const bannerUrl = meta.banner_url || '';
  const email = user.email || '';
  const createdAt = new Date(user.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    const { url, error } = await uploadAvatar(file);
    if (!error && url) {
      await updateProfile({ avatar_url: url });
    }
    setAvatarUploading(false);
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerUploading(true);
    // Reuse uploadAvatar logic but with banner path
    const { url, error } = await uploadAvatar(file); // Will save as avatar but we store as banner_url
    if (!error && url) {
      await updateProfile({ banner_url: url });
    }
    setBannerUploading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-0">
      {/* ═══ BANNER ═══ */}
      <div className="relative h-40 sm:h-52 rounded-t-srfv overflow-hidden bg-gradient-to-br from-srfv-primary/30 to-srfv-bg-darker group">
        {bannerUrl && (
          <Image src={bannerUrl} alt="Banner" fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <button
            onClick={() => bannerInput.current?.click()}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-4 py-2 rounded-full"
          >
            {bannerUploading ? 'Enviando...' : 'Alterar Banner'}
          </button>
        </div>
        <input ref={bannerInput} type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
      </div>

      {/* ═══ AVATAR + NAME HEADER ═══ */}
      <div className="relative bg-srfv-bg-darker px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-14">
          {/* Avatar */}
          <div className="relative group flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-srfv-bg-darker overflow-hidden bg-srfv-bg-dark">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="Avatar" width={112} height={112} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl text-srfv-text-muted">
                  {name ? name[0].toUpperCase() : email[0].toUpperCase()}
                </div>
              )}
            </div>
            <button
              onClick={() => avatarInput.current?.click()}
              className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-colors"
            >
              <span className="opacity-0 group-hover:opacity-100 text-white text-xs transition-opacity">
                {avatarUploading ? '...' : '📷'}
              </span>
            </button>
            <input ref={avatarInput} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>

          {/* Name & info */}
          <div className="text-center sm:text-left pb-1">
            <h1 className="text-xl font-bold">{name || email.split('@')[0]}</h1>
            <p className="text-xs text-srfv-text-muted">Membro desde {createdAt}</p>
          </div>
        </div>

        {/* Bio under avatar area */}
        {bio && (
          <p className="mt-4 text-sm text-srfv-text-secondary whitespace-pre-wrap">{bio}</p>
        )}
      </div>

      {/* ═══ PROFILE FIELDS ═══ */}
      <div className="section-box !rounded-t-none space-y-0">
        <h2 className="text-lg font-bold mb-2">Meu <span className="heading-em">Perfil</span></h2>

        <EditableField
          label="Nome"
          value={name}
          placeholder="Seu nome"
          onSave={async (v) => {
            const { error } = await updateProfile({ name: v });
            return error;
          }}
        />

        <EditableField
          label="Email"
          value={email}
          type="email"
          placeholder="seu@email.com"
          onSave={async (v) => {
            const { error } = await updateProfile({ email: v });
            return error;
          }}
        />

        <EditableField
          label="Senha"
          value=""
          type="password"
          placeholder="Nova senha (mín. 6 caracteres)"
          onSave={async (v) => {
            if (v.length < 6) return 'Senha deve ter ao menos 6 caracteres.';
            const { error } = await updateProfile({ password: v });
            return error;
          }}
        />

        <EditableBio
          value={bio}
          onSave={async (v) => {
            const { error } = await updateProfile({ bio: v });
            return error;
          }}
        />
      </div>
    </div>
  );
}
