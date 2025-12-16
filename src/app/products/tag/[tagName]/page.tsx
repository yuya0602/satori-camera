import { getMercariProducts, getProductsByTag, extractLensName, extractMountType, formatPrice } from '@/lib/mercari';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimationScripts from '@/components/AnimationScripts';

// Generate static params for all tags
export async function generateStaticParams() {
  const products = await getMercariProducts();
  const allTags = products.flatMap(p => p.Tag.split(',').map(tag => tag.trim())).filter(tag => tag.length > 0);
  const uniqueTags = [...new Set(allTags)];

  return uniqueTags.map((tag) => ({
    tagName: encodeURIComponent(tag),
  }));
}

interface TagPageProps {
  params: {
    tagName: string;
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tagName } = await params;
  const decodedTagName = decodeURIComponent(tagName);
  const products = await getProductsByTag(decodedTagName);

  if (products.length === 0) {
    notFound();
  }

  return (
    <div className="scroll-smooth">
      <AnimationScripts />

      {/* Background Effects */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-indigo-900 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="bg-noise"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-40 top-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-glass-200 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 shadow-lg transition-all duration-300">
          <Link href="/" className="text-2xl font-bold tracking-widest text-white flex items-center group">
            <span className="group-hover:text-gray-300 transition-colors">SATORI</span>
          </Link>
          <div className="flex space-x-8 text-sm tracking-widest uppercase text-gray-300 items-center">
            <Link href="/products" className="hover:text-white transition-colors">All Products</Link>
            <a href="#" className="hover:text-white transition-colors">Cart (0)</a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-40 pb-12 px-6 text-center fade-up-element">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">#{decodedTagName}</h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base font-light tracking-wide">
          {products.length}点の商品
        </p>
      </header>

      {/* Products Grid */}
      <main className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, index) => {
            const lensName = extractLensName(product.title);
            const mountType = extractMountType(product.title, product.Tag);
            const delayClass = `delay-${((index % 3) + 1) * 100}`;

            return (
              <Link
                key={product.product_id}
                href={`/products/${product.product_id}`}
                className={`group block fade-up-element ${delayClass}`}
              >
                <div className="relative overflow-hidden rounded-2xl bg-glass-100 border border-white/10 aspect-[4/3] mb-4 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:border-white/30">
                  {product.image_01 && (
                    <img
                      src={product.image_01}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {lensName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                      {mountType} / {product.condition}
                    </p>
                  </div>
                  <span className="font-mono text-white">{formatPrice(product.price)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-10 px-6 relative z-10 text-center">
        <div className="mb-4">
          <Link href="/" className="text-xl font-bold tracking-widest text-white">
            SATORI
          </Link>
        </div>
        <p className="text-gray-600 text-xs tracking-wide">&copy; 2024 SATORI CAMERA. All rights reserved.</p>
      </footer>
    </div>
  );
}
