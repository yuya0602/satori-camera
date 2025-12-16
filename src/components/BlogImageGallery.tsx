'use client';

import { useEffect } from 'react';
import styles from './BlogImageGallery.module.css';

export default function BlogImageGallery() {
  useEffect(() => {
    // 記事内のすべての画像にクリックイベントを追加
    const images = document.querySelectorAll('.articleContent img');

    images.forEach((img) => {
      img.addEventListener('click', handleImageClick);
      // ホバー時のカーソル変更
      (img as HTMLElement).style.cursor = 'zoom-in';
    });

    // クリーンアップ
    return () => {
      images.forEach((img) => {
        img.removeEventListener('click', handleImageClick);
      });
    };
  }, []);

  const handleImageClick = (e: Event) => {
    const img = e.target as HTMLImageElement;
    const modal = document.createElement('div');
    modal.className = styles.imageModal;
    modal.innerHTML = `
      <div class="${styles.modalOverlay}">
        <button class="${styles.closeButton}" aria-label="閉じる">✕</button>
        <img src="${img.src}" alt="${img.alt}" class="${styles.modalImage}" />
        <div class="${styles.imageCaption}">${img.alt || ''}</div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // アニメーション開始
    requestAnimationFrame(() => {
      modal.classList.add(styles.show);
    });

    // 閉じるボタン
    const closeButton = modal.querySelector(`.${styles.closeButton}`);
    const closeModal = () => {
      modal.classList.remove(styles.show);
      setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
      }, 300);
    };

    closeButton?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal || (e.target as HTMLElement).classList.contains(styles.modalOverlay)) {
        closeModal();
      }
    });

    // Escキーで閉じる
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  };

  return null; // このコンポーネントは何もレンダリングしない
}
