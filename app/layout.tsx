import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import { SessionProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <SessionProvider>
                <body className={inter.className}>
                    <Nav />
                    <div className="flex flex-col items-center mt-5">
                        {children}
                    </div>
                </body>
            </SessionProvider>
        </html>
    );
}
