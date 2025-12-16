'use client';

import { useState, useRef } from 'react';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) {
    return (
      <div className={styles.noImage}>
        <span className="body secondary-text">画像がありません</span>
      </div>
    );
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMainImageClick = () => {
    setModalIndex(selectedIndex);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePrevious = () => {
    setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setModalIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleModalClose();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailsRef.current) {
      const scrollAmount = 400; // スクロール量（約5つのサムネイル分）
      const currentScroll = thumbnailsRef.current.scrollLeft;
      const targetScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

      thumbnailsRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className={styles.gallery}>
        {/* メイン画像 */}
        <div className={styles.mainImageWrapper} onClick={handleMainImageClick}>
          <img
            src={images[selectedIndex]}
            alt={`${title} - メイン画像`}
            className={styles.mainImage}
          />
          <div className={styles.zoomHint}>
            <span className="caption-1">クリックで拡大</span>
          </div>
        </div>

        {/* サムネイル */}
        {images.length > 1 && (
          <div className={styles.thumbnailsContainer}>
            {images.length > 5 && (
              <button
                className={`${styles.thumbnailNavButton} ${styles.thumbnailNavLeft}`}
                onClick={() => scrollThumbnails('left')}
                aria-label="前のサムネイルへ"
              >
                ‹
              </button>
            )}
            <div className={styles.thumbnailsWrapper} ref={thumbnailsRef}>
              <div className={styles.thumbnails}>
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${
                      index === selectedIndex ? styles.thumbnailActive : ''
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                    aria-label={`画像${index + 1}を表示`}
                  >
                    <img
                      src={image}
                      alt={`${title} - サムネイル${index + 1}`}
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            </div>
            {images.length > 5 && (
              <button
                className={`${styles.thumbnailNavButton} ${styles.thumbnailNavRight}`}
                onClick={() => scrollThumbnails('right')}
                aria-label="次のサムネイルへ"
              >
                ›
              </button>
            )}
          </div>
        )}
      </div>

      {/* スライドショーモーダル */}
      {isModalOpen && (
        <div
          className={styles.modal}
          onClick={handleModalClose}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* 閉じるボタン */}
            <button
              className={styles.closeButton}
              onClick={handleModalClose}
              aria-label="閉じる"
            >
              ✕
            </button>

            {/* 前へボタン */}
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={handlePrevious}
              aria-label="前の画像"
            >
              ‹
            </button>

            {/* モーダル画像 */}
            <div className={styles.modalImageWrapper}>
              <img
                src={images[modalIndex]}
                alt={`${title} - 画像${modalIndex + 1}`}
                className={styles.modalImage}
              />
            </div>

            {/* 次へボタン */}
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={handleNext}
              aria-label="次の画像"
            >
              ›
            </button>

            {/* インジケーター */}
            <div className={styles.indicator}>
              <span className="caption-1">
                {modalIndex + 1} / {images.length}
              </span>
            </div>

            {/* サムネイルナビゲーション */}
            <div className={styles.modalThumbnails}>
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.modalThumbnail} ${
                    index === modalIndex ? styles.modalThumbnailActive : ''
                  }`}
                  onClick={() => setModalIndex(index)}
                  aria-label={`画像${index + 1}を表示`}
                >
                  <img
                    src={image}
                    alt={`サムネイル${index + 1}`}
                    className={styles.modalThumbnailImage}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
