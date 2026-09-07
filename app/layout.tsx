import type { Metadata } from 'next';
import './globals.css';
import './ui-blocks/studio.css';
export const metadata: Metadata = {title:'D5 Arco — A unified design workflow',description:'Meet D5 Arco. Explore Canvas, Chat and Connection: a unified workflow connecting every stage of design.',icons:{icon:'/assets/brand.webp'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN" className="dark"><body>{children}</body></html>}
