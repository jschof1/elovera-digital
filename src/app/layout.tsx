import { AuthContextProvider } from '@/context/AuthContext';
import { Roboto } from 'next/font/google';
import './globals.css';


const roboto = Roboto({
  weight: '400', // Specify the weight you need
  preload: true, // Assuming you want to preload the font
  subsets: ['latin'] // Specify any subsets you need
});
// Metadata for the application
export const metadata = {
  title: 'Elovera',
  description: 'Elovera Digital Platform',
};

// Root layout component for the application
export default function RootLayout( { children }: { children: React.ReactNode } ): JSX.Element {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        {/* Wrap the children with the AuthContextProvider to provide authentication context */}
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}


