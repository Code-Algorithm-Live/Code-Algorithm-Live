import type { Metadata } from 'next';
import '@/styles/globals.css';
import Provider from '@/utils/providers/Provider';
import AuthSession from '@/utils/providers/session-provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthSession>
          <Provider>{children}</Provider>
        </AuthSession>
      </body>
    </html>
  );
}
