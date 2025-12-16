import { getProducts, getProductsByCategory, formatPrice, getConditionLabel, getCategoryName } from '@/lib/products';
import styles from '../../page.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate static params for all categories
// Generate static params for all categories
export async function generateStaticParams() {
  const products = await getProducts();
  const categories = [...new Set(products.map(p => p.category).filter(c => c && c.trim().length > 0))];

  return categories.map((category) => ({
    categoryId: category,
  }));
}

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;
  const products = await getProductsByCategory(categoryId);
  const categoryName = getCategoryName(categoryId);

  if (products.length === 0) {
    notFound();
  }

  return (
    <div className={styles.pageWrapper}>
      {/* ヘッダー */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.navContent}>
            <Link href="/" className={styles.logo}>
              Classic Camera Shop
            </Link>
            <Link href="/products" className="subheadline">
              ← 全商品一覧へ
            </Link>
          </div>
        </nav>
      </header>

      {/* ヒーローセクション */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className="large-title">{categoryName}</h1>
            <p className="title-3 secondary-text">
              {products.length}点の商品
            </p>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={`card ${styles.productCard}`}
              >
                <div className={styles.imageWrapper}>
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className={styles.productImage}
                    />
                  ) : (
                    <div className={styles.placeholderImage}>
                      <span className="caption-1 tertiary-text">
                        画像なし
                      </span>
                    </div>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3 className="headline">{product.title}</h3>
                  <p className="subheadline secondary-text">
                    {categoryName}
                  </p>
                  <div className={styles.cardFooter}>
                    <span className="title-3">{formatPrice(product.price)}</span>
                    <span className={`${styles.badge} footnote`}>
                      {getConditionLabel(product.condition)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
