'use client';

import { useState, useEffect } from 'react';
import styles from './HeroSlideshow.module.css';

const slides = [
  {
    image: '/image/hero.webp',
    title: 'あの感動をもう一度...',
    subtitle: '「うわ、この写り何？めちゃくちゃエモい…」',
    description: 'オールドレンズが魅せる、現代では表現できない独特な世界',
  },
  {
    image: '/image/hero2.webp',
    title: '時を超える美しさ',
    subtitle: 'クラシックカメラで切り取る、特別な瞬間',
    description: '1万円で手に入る、あなただけの特別な1枚',
  },
  {
    image: '/image/hero3.webp',
    title: '週末、カメラを手に',
    subtitle: '久しぶりにカメラバッグを肩にかけてみませんか？',
    description: 'プロが整備した、すぐに使える一台',
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setNextSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 1500); // トランジション時間と合わせる（1.5秒）
    }, 5000); // 5秒ごとに切り替え

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      {/* 背景スライド */}
      <div className={styles.slideContainer}>
        {/* 現在のスライド */}
        <div
          className={`${styles.slide} ${styles.currentSlide} ${
            isTransitioning ? styles.slideOut : ''
          }`}
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        />

        {/* 次のスライド */}
        <div
          className={`${styles.slide} ${styles.nextSlide} ${
            isTransitioning ? styles.slideIn : ''
          }`}
          style={{ backgroundImage: `url(${slides[nextSlide].image})` }}
        />
      </div>

      {/* オーバーレイ */}
      <div className={styles.overlay} />

      {/* コンテンツ */}
      <div className={styles.heroContent}>
        <h2 className="large-title">{slides[currentSlide].title}</h2>
        <p className="title-2">{slides[currentSlide].subtitle}</p>
        <p className="title-3">{slides[currentSlide].description}</p>
      </div>

      {/* スライドインジケーター */}
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentSlide ? styles.indicatorActive : ''
            }`}
            onClick={() => {
              setCurrentSlide(index);
              setNextSlide((index + 1) % slides.length);
            }}
            aria-label={`スライド${index + 1}へ移動`}
          />
        ))}
      </div>
    </section>
  );
}
