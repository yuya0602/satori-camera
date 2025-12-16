'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AnimationScripts() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Intersection Observer for Fade-in Up Animation
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Run once
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      const fadeElements = document.querySelectorAll('.fade-up-element');
      fadeElements.forEach(el => observer.observe(el));
    }, 100);

    // Parallax Effect for Backgrounds
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const blobs = document.querySelectorAll('.animate-blob');

      // Subtle movement of background blobs based on scroll
      blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.05;
        (blob as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams]);

  return null;
}
