'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';
import { useTranslations } from 'next-intl';
import { checkImageNSFW } from '@/lib/nsfwCheck';
import Image from 'next/image';

type UploadStatus = 'idle' | 'checking' | 'uploading' | 'success' | 'error' | 'nsfw';

export default function ArtUploadForm() {
  const t = useTranslations('Art');
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [artistName, setArtistName] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setArtistName('');
    setConsent(false);
    setStatus('idle');
    setErrorMsg('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setErrorMsg('');
    setStatus('idle');

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMsg(t('invalidFileType'));
      setStatus('error');
      return;
    }

    // Validate file size (5 MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMsg(t('fileTooLarge'));
      setStatus('error');
      return;
    }

    // Show preview
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));

    // NSFW check
    setStatus('checking');
    try {
      const result = await checkImageNSFW(selectedFile);
      if (!result.safe) {
        setStatus('nsfw');
        setPreview(null);
        setFile(null);
        if (inputRef.current) inputRef.current.value = '';
        return;
      }
    } catch {
      // If check fails, allow upload (server will validate too)
    }
    setStatus('idle');
  };

  const handleSubmit = async () => {
    if (!file || !consent || !artistName.trim() || !user || !supabase) return;

    setStatus('uploading');
    setErrorMsg('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setErrorMsg(t('notAuthenticated'));
        setStatus('error');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('artistName', artistName.trim());

      const res = await fetch('/api/upload-art', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || t('uploadFailed'));
        setStatus('error');
        return;
      }

      setStatus('success');
      setTimeout(resetForm, 4000);
    } catch {
      setErrorMsg(t('uploadFailed'));
      setStatus('error');
    }
  };

  // Not logged in
  if (!user) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-srfv-text-secondary">{t('loginToUpload')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* File picker */}
      <div>
        <label className="block text-sm font-medium mb-2">{t('selectImage')}</label>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="block w-full text-sm text-srfv-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-srfv-primary/20 file:text-srfv-primary hover:file:bg-srfv-primary/30 file:cursor-pointer file:transition-colors"
        />
        <p className="text-xs text-srfv-text-muted mt-1">{t('fileRequirements')}</p>
      </div>

      {/* NSFW check status */}
      {status === 'checking' && (
        <div className="flex items-center gap-2 text-sm text-yellow-400">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {t('checkingImage')}
        </div>
      )}

      {/* NSFW blocked */}
      {status === 'nsfw' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-srfv-xs p-4 text-sm text-red-400">
          <p className="font-medium">🚫 {t('nsfwBlocked')}</p>
          <p className="text-xs mt-1 text-red-400/70">{t('nsfwBlockedDesc')}</p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative w-full max-w-xs rounded-srfv-xs overflow-hidden border border-srfv-border">
          <Image src={preview} alt="Preview" width={300} height={200} className="w-full h-48 object-cover" unoptimized />
        </div>
      )}

      {/* Artist name & submit — visible when file is ready */}
      {file && (status === 'idle' || status === 'uploading') && (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">{t('artistNameLabel')}</label>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder={t('artistNamePlaceholder')}
              maxLength={50}
              disabled={status === 'uploading'}
              className="w-full bg-white/[0.04] border border-srfv-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-srfv-text-dim focus:outline-none focus:border-srfv-primary/50 focus:bg-white/[0.07] transition-all disabled:opacity-50"
            />
          </div>

          {/* Consent checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={status === 'uploading'}
              className="mt-0.5 w-4 h-4 rounded border-srfv-border bg-white/5 text-srfv-primary focus:ring-srfv-primary/50 cursor-pointer"
            />
            <span className="text-xs text-srfv-text-secondary leading-relaxed group-hover:text-srfv-text-primary transition-colors">
              {t('consentText')}
            </span>
          </label>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!consent || !artistName.trim() || status === 'uploading'}
            className="btn-primary-srfv w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === 'uploading' ? t('uploading') : t('submitArt')}
          </button>
        </>
      )}

      {/* Success message */}
      {status === 'success' && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-srfv-xs p-4 text-sm text-green-400">
          <p className="font-medium">✅ {t('uploadSuccess')}</p>
          <p className="text-xs mt-1 text-green-400/70">{t('uploadSuccessDesc')}</p>
        </div>
      )}

      {/* Error message */}
      {status === 'error' && errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-srfv-xs p-4 text-sm text-red-400">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
