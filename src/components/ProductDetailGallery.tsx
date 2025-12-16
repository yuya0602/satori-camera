'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ProductDetailGalleryProps {
  images: string[];
  title: string;
}

export default function ProductDetailGallery({ images, title }: ProductDetailGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || '');
  const [lightboxImage, setLightboxImage] = useState(images[0] || '');
  const [showLightbox, setShowLightbox] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mounted, setMounted] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const lightboxThumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const THUMBNAIL_WIDTH = 96 + 16; // w-24 (96px) + gap (16px)
  const VISIBLE_THUMBNAILS = 5;

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleLightboxThumbnailClick = (image: string) => {
    setLightboxImage(image);
  };

  const openLightbox = () => {
    setLightboxImage(mainImage);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.close-button')) {
      setShowLightbox(false);
      document.body.style.overflow = '';
    }
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (!thumbnailContainerRef.current) return;

    const newPosition = direction === 'left'
      ? Math.max(0, scrollPosition - THUMBNAIL_WIDTH)
      : Math.min((images.length - VISIBLE_THUMBNAILS) * THUMBNAIL_WIDTH, scrollPosition + THUMBNAIL_WIDTH);

    setScrollPosition(newPosition);
    thumbnailContainerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  const scrollLightboxThumbnails = (direction: 'left' | 'right') => {
    if (!lightboxThumbnailRef.current) return;

    const scrollAmount = direction === 'left' ? -THUMBNAIL_WIDTH : THUMBNAIL_WIDTH;
    lightboxThumbnailRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const navigateLightboxImage = (direction: 'prev' | 'next') => {
    const currentIndex = images.indexOf(lightboxImage);
    if (direction === 'prev' && currentIndex > 0) {
      setLightboxImage(images[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < images.length - 1) {
      setLightboxImage(images[currentIndex + 1]);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = images.length > VISIBLE_THUMBNAILS && scrollPosition < (images.length - VISIBLE_THUMBNAILS) * THUMBNAIL_WIDTH;

  const lightboxModal = showLightbox && mounted ? createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col"
      onClick={closeLightbox}
      style={{ margin: 0, padding: 0, left: 0, top: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
    >
      {/* Close Button - Fixed position */}
      <button
        onClick={closeLightbox}
        className="close-button fixed top-4 right-4 z-[10000] bg-white/10 hover:bg-white/30 text-white rounded-full p-3 transition-colors backdrop-blur-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Main Lightbox Image Container */}
        <div className="min-h-screen flex items-center justify-center relative px-4 py-24">
        {/* Previous Image Button */}
        {images.indexOf(lightboxImage) > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightboxImage('prev');
            }}
            className="absolute left-2 md:left-6 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <img
          src={lightboxImage}
          alt={title}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next Image Button */}
        {images.indexOf(lightboxImage) < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightboxImage('next');
            }}
            className="absolute right-2 md:right-6 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        </div>

        {/* Lightbox Thumbnails */}
        <div className="relative w-full mx-auto pb-6 px-4" onClick={(e) => e.stopPropagation()}>
        {/* Left Navigation */}
        {images.length > 5 && (
          <button
            onClick={() => scrollLightboxThumbnails('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Thumbnails */}
        <div
          ref={lightboxThumbnailRef}
          className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide justify-center px-10"
        >
          {images.slice(0, 16).map((image, index) => (
            <button
              key={index}
              className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 ${
                lightboxImage === image ? 'border-white/80' : 'border-white/20'
              } overflow-hidden transition-all duration-300 hover:border-white/60 focus:outline-none`}
              onClick={() => handleLightboxThumbnailClick(image)}
            >
              <img src={image} alt={`${title} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Right Navigation */}
        {images.length > 5 && (
          <button
            onClick={() => scrollLightboxThumbnails('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {/* Main Image */}
      <div className="relative w-full rounded-2xl overflow-hidden cursor-zoom-in group border border-white/5" onClick={openLightbox}>
        <img
          src={mainImage}
          alt={title}
          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10 pointer-events-none"></div>
        <div className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>

      {/* Thumbnails with Navigation */}
      <div className="relative mt-6">
        {/* Left Navigation Button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollThumbnails('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Thumbnails Container */}
        <div
          ref={thumbnailContainerRef}
          className="flex space-x-4 overflow-x-hidden pb-2 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {images.slice(0, 16).map((image, index) => (
            <button
              key={index}
              className={`w-24 h-24 flex-shrink-0 rounded-xl border-2 ${
                mainImage === image ? 'border-white/80' : 'border-transparent'
              } overflow-hidden transition-all duration-300 hover:border-white/50 focus:outline-none`}
              onClick={() => handleThumbnailClick(image)}
            >
              <img src={image} alt={`${title} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Right Navigation Button */}
        {canScrollRight && (
          <button
            onClick={() => scrollThumbnails('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {lightboxModal}
    </>
  );
}
