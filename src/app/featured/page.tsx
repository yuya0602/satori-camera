import Link from 'next/link';
import AnimationScripts from '@/components/AnimationScripts';
import { getFeaturedProducts, extractLensName, formatPrice } from '@/lib/mercari';

export default async function FeaturedPage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="scroll-smooth">
      <AnimationScripts />

      {/* Background Effects */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-teal-900 rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="bg-noise"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-40 top-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-glass-200 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 shadow-lg transition-all duration-300">
          <Link href="/" className="text-2xl font-bold tracking-widest text-white flex items-center group">
            <span className="group-hover:text-gray-300 transition-colors">SATORI</span>
          </Link>
          <div className="hidden md:flex space-x-8 text-sm tracking-widest uppercase text-gray-300 items-center">
            <Link href="/products" className="hover:text-white transition-colors">
              Store
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Journal
            </Link>
          </div>
          <div className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="fade-up-element mb-16 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-blue-300 mb-6 font-bold">Featured Collection</p>
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-8">
              Featured <span className="text-gray-500 italic">Lenses</span>
            </h1>
            <p className="text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              厳選されたプレミアムレンズコレクション。各レンズは丁寧に整備され、最高の状態でお届けします。
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const lensName = extractLensName(product.title);
              return (
                <Link
                  key={product.product_id}
                  href={`/products/${product.product_id}`}
                  className="fade-up-element group"
                >
                  <div className="bg-glass-100 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-500 hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                    <div className="relative aspect-square overflow-hidden bg-white/5">
                      <img
                        src={product.image_01}
                        alt={lensName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                        {lensName}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">{product.condition}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-mono font-semibold">{formatPrice(product.price)}</span>
                        <span className="text-xs text-blue-400 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                          VIEW DETAILS →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty State */}
          {featuredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">現在、Featured商品はありません。</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-10 px-6 relative z-10 text-center">
        <Link href="/" className="text-xl font-bold tracking-widest text-white mb-4 block">
          SATORI
        </Link>
        <p className="text-gray-600 text-xs tracking-wide">&copy; 2024 SATORI CAMERA. All rights reserved.</p>
      </footer>
    </div>
  );
}
