import Header from '@/components/Header';
import './globals.css';
import { Poppins } from 'next/font/google';
import AuthProvider from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import FooterComponent from '@/components/FooterComponent';
import Head from 'next/head';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Blogify',
  description: 'Worlds no. 1 blog site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/assets/favicon.png" sizes="any" />
      </Head>
      <body className={poppins.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <Header />
          {children}
          <FooterComponent />
        </AuthProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
