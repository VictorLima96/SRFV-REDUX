// Root layout – passthrough to [locale]/layout.tsx which provides <html>/<body>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
