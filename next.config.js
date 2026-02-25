const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || 'https://cegiaxwwaiwtomjqsdmq.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZ2lheHd3YWl3dG9tanFzZG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDY2MDcsImV4cCI6MjA4NzUyMjYwN30.DUmUZEFPz22Icnlzd_HemfxCP8qokEBNblfsrrOCyZQ',
  },
};

module.exports = withNextIntl(nextConfig);
