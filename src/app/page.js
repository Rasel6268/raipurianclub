// app/page.js
'use client';

import Footer from '@/components/Footer';
import Hero2 from '@/components/Hero2';
import Navbar from '@/components/Navbar';
import Navbar2 from '@/components/Navbar2';
import { useEffect, useRef } from 'react';


export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-black">
      {/* <Navbar /> */}
      <Navbar2/>
    <Hero2/>
      
 

    

  

      <Footer />
    </main>
  );
}

