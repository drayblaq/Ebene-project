import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';

export const metadata: Metadata = {
  title: 'Ébène — Cotonou, Bénin',
  description: 'Vêtements qui portent l'âme du bois d'ébène. Mode contemporaine, Cotonou, République du Bénin.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AppProvider>
          <Cursor />
          <Navbar />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
