import Head from 'next/head'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import { useState, useEffect } from 'react'


export default function Layout({children}) {
  const [footerData, setFooterData] = useState('');
  useEffect(() => {
    const foot = async () => {
      const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_FOOTER;
      const res = await fetch(url);
      const footer = await res.json();
      setFooterData(footer);
    }
    foot();
  }, []);
  
  return (
    <>
      <main>
        <Header />
          {children}
        <Footer data={footerData} />
      </main>
    </>
  )
}
