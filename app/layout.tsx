import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';

export const metadata: Metadata = {
  title: 'Ébène · Cotonou, Bénin',
  description: "Vêtements qui portent l'âme du bois d'ébène. Mode contemporaine, Cotonou, République du Bénin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Joti+One&family=Aoboshi+One&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppProvider>
          <SplashScreen />
          <Navbar />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
