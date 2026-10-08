import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Jibon Unlocked | আমার জীবনের গল্প',description:'বাংলাদেশি স্মৃতি দিয়ে নিজের রেট্রো মেমোরি ডায়েরি বানাও।'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn"><body>{children}</body></html>}
