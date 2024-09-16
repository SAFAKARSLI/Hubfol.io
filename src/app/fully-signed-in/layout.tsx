export const metadata = {
  title: 'Hubfol.io',
  description: 'User signed in. Redirecting.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
