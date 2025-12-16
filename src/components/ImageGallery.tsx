'use client';

import { useState } from 'react';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      {/* メイン画像 */}
      <div className={styles.mainImageWrapper}>
        <button
          className={styles.mainImage}
          onClick={() => openModal(selectedIndex)}
          aria-label="画像を拡大"
        >
          <img src={images[selectedIndex]} alt={`${alt} - メイン画像`} />
          <div className={styles.zoomIcon}>🔍</div>
        </button>
      </div>

      {/* サムネイル一覧 */}
      <div className={styles.thumbnailGrid}>
        {images.map((image, index) => (
          <button
            key={index}
            className={`${styles.thumbnail} ${
              index === selectedIndex ? styles.thumbnailActive : ''
            }`}
            onClick={() => setSelectedIndex(index)}
            aria-label={`画像 ${index + 1} を選択`}
          >
            <img src={image} alt={`${alt} - サムネイル ${index + 1}`} />
          </button>
        ))}
      </div>

      {/* 拡大表示モーダル */}
      {isModalOpen && (
        <div
          className={styles.modal}
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="画像拡大表示"
          tabIndex={0}
        >
          <button
            className={styles.closeButton}
            onClick={closeModal}
            aria-label="閉じる"
          >
            ✕
          </button>

          <button
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="前の画像"
          >
            ‹
          </button>

          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIndex]}
              alt={`${alt} - 拡大表示 ${selectedIndex + 1}`}
            />
          </div>

          <button
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="次の画像"
          >
            ›
          </button>

          <div className={styles.imageCounter}>
            <span className="footnote">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>

          {/* サムネイルナビゲーション */}
          <div className={styles.modalThumbnails}>
            {images.map((image, index) => (
              <button
                key={index}
                className={`${styles.modalThumbnail} ${
                  index === selectedIndex ? styles.modalThumbnailActive : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(index);
                }}
                aria-label={`画像 ${index + 1} に移動`}
              >
                <img src={image} alt={`サムネイル ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
