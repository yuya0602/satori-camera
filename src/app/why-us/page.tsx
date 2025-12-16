'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function WhyUsPage() {
  const [activeSection, setActiveSection] = useState(0);
  const totalSections = 5; // 全セクション数

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % totalSections);
    }, 6000); // 6秒ごとに切り替え

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* ヘッダー */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.navContent}>
            <a href="/" className={styles.logo}>
              Classic Camera Shop
            </a>
            <a href="/" className="subheadline">
              ← ホームへ戻る
            </a>
          </div>
        </nav>
      </header>

      {/* ヒーローセクション */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className="large-title">なぜ、私たちが選ばれ続けるのか</h1>
            <p className="title-3 secondary-text">
              プロカメラマンの経験と技術が支える、本物のカメラ・レンズ販売
            </p>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        {/* スライドショーコンテナ */}
        <div className={styles.slideshowContainer}>
          {/* セクション1: プロカメラマンの実績（パララックス背景） */}
          <section
            className={`${styles.parallaxSection} ${activeSection === 0 ? styles.active : ''}`}
            style={{ backgroundImage: 'url(/image/why1.jpeg)' }}
          >
            <div className={styles.parallaxOverlay}>
              <div className="container">
                <div className={styles.parallaxContent}>
                  <h2 className="large-title">プロカメラマン11年の実績が支える、確かな目利き</h2>
                  <p className="title-3">
                    フォトコンテスト受賞歴を持つプロカメラマンとして、人物撮影から建築写真、トラベルフォトまで幅広い現場で培った「本当に使えるレンズ」を見極める力。コンサルタント時代の経験も活かし、お客様の撮影スタイルに最適なレンズをご提案します。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* セクション2: フィールドテスト（パララックス背景） */}
          <section
            className={`${styles.parallaxSection} ${activeSection === 1 ? styles.active : ''}`}
            style={{ backgroundImage: 'url(/image/field.webp)' }}
          >
            <div className={styles.parallaxOverlay}>
              <div className="container">
                <div className={styles.parallaxContent}>
                  <h2 className="large-title">5項目の徹底フィールドテスト</h2>
                  <p className="title-3">すべてのレンズで実施する独自の検証項目：</p>
                  <ul className={styles.parallaxList}>
                    <li className="body">光芒パターンの美しさ</li>
                    <li className="body">逆光耐性の確認</li>
                    <li className="body">無限遠の精度</li>
                    <li className="body">最短撮影距離の動作</li>
                    <li className="body">等身大パネルでのポートレート撮影テスト</li>
                  </ul>
                  <div className={styles.parallaxHighlight}>
                    <p className="headline">実写サンプル付きでお渡しするので、購入前に撮影イメージが分かります。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* セクション3: 整備技術 */}
          <section
            className={`${styles.parallaxSection} ${activeSection === 2 ? styles.active : ''}`}
            style={{ backgroundImage: 'url(/image/bunkai.webp)' }}
          >
            <div className={styles.parallaxOverlay}>
              <div className="container">
                <div className={styles.parallaxContent}>
                  <h2 className="large-title">「不可能」を「可能」に変える整備技術</h2>
                  <p className="title-3">
                    潰れたネジで分解不能と思われたCanon New FD 50mm F1.2 Lも、諦めずに様々な手法で完全整備した実績。カビ取り、バルサム切れ補修、絞り羽の油染み除去、ヘリコイド調整まで、妥協しない技術力でレンズを蘇らせます。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* セクション4: アフターサポート */}
          <section
            className={`${styles.parallaxSection} ${activeSection === 3 ? styles.active : ''}`}
            style={{ backgroundImage: 'url(/image/again.webp)' }}
          >
            <div className={styles.parallaxOverlay}>
              <div className="container">
                <div className={styles.parallaxContent}>
                  <h2 className="large-title">最高の買い物だったと思っていただくために</h2>
                  <p className="title-3">
                    <strong>「またあの人から買いたい」</strong> —— そう思っていただけることが私たちの目標です。
                  </p>
                  <ul className={styles.parallaxList}>
                    <li className="body">撮影に影響する不具合は即座に再整備・交換対応</li>
                    <li className="body">Instagram(@satori_camera_and_lenses)での撮影相談は無制限</li>
                    <li className="body">設定方法からレンズ選びまで、プロの視点でサポート</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* セクション5: 原点 */}
          <section
            className={`${styles.parallaxSection} ${activeSection === 4 ? styles.active : ''}`}
            style={{ backgroundImage: 'url(/image/genten.webp)' }}
          >
            <div className={styles.parallaxOverlay}>
              <div className="container">
                <div className={styles.parallaxContent}>
                  <h2 className="large-title">私の原点 —— 高額機材からオールドレンズへ</h2>
                  <p className="title-3">
                    以前はα1を含む高額機材を使用していましたが、事業資金の関係で全て手放すことに。それでも撮影を続けたくて、12,000円のNEX-6と5,000円のSuper Takumar 55mm F1.8を購入しました。
                  </p>
                  <div className={styles.parallaxHighlight}>
                    <p className="headline">撮れた写真の美しさに衝撃を受けました。</p>
                  </div>
                  <p className="title-3">
                    「高いレンズだけが良いわけじゃない」—— この実体験があるからこそ、本当に撮影が楽しくなるオールドレンズの魅力をお伝えできるのです。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* インジケーター */}
          <div className={styles.indicators}>
            {[...Array(totalSections)].map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${activeSection === index ? styles.indicatorActive : ''}`}
                onClick={() => setActiveSection(index)}
                aria-label={`セクション${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTAセクション */}
        <div className="container">
          <section className={styles.ctaSection}>
              <h2 className="title-2">商品を見る</h2>
              <div className={styles.ctaButtons}>
                <a href="/#cameras" className="button button-primary">
                  カメラコレクション
                </a>
                <a href="/#lenses" className="button button-secondary">
                  オールドレンズ
                </a>
              </div>
          </section>
        </div>
      </main>

      {/* フッター */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <p className="footnote secondary-text">
              © 2024 Classic Camera Shop. All rights reserved.
            </p>
            <div className={styles.footerLinks}>
              <a href="#privacy" className="footnote">
                プライバシーポリシー
              </a>
              <a href="#terms" className="footnote">
                利用規約
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
