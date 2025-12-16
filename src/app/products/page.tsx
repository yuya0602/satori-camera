import { searchLenses, getSonyCameras, extractLensName, extractMountType, extractCameraName, formatPrice } from '@/lib/mercari';
import Link from 'next/link';
import AnimationScripts from '@/components/AnimationScripts';
import ProductsHeader from '@/components/ProductsHeader';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Next.js 15ではsearchParamsはPromiseなのでawaitが必要
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';
  const category = typeof params.category === 'string' ? params.category : '';

  const products = category === 'camera'
    ? await getSonyCameras()
    : await searchLenses(query);

  const isCameraView = category === 'camera';
  const pageTitle = isCameraView ? 'Sony E-mount Cameras' : 'The Collection';
  const pageSubtitle = isCameraView
    ? '動作保証付きの厳選されたSony製ボディ。'
    : '整備済みオールドレンズとマウントアダプター。\n光を操るための厳選されたラインナップ。';

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
      <ProductsHeader />

      {/* Header */}
      <header className="pt-40 pb-12 px-6 text-center fade-up-element">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{pageTitle}</h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base font-light tracking-wide whitespace-pre-wrap">
          {pageSubtitle}
        </p>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-28 z-30 px-6 mb-12 fade-up-element delay-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-glass-200 backdrop-blur-lg border border-white/10 rounded-xl p-2 md:p-3 shadow-xl">

            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 min-w-max px-2">
                <button className="px-5 py-2 rounded-lg bg-white text-black text-xs font-bold tracking-wider hover:bg-gray-200 transition-colors">ALL</button>
                <button className="px-5 py-2 rounded-lg bg-glass-100 border border-white/5 text-gray-300 text-xs font-bold tracking-wider hover:bg-glass-300 hover:text-white transition-all">NIKON</button>
                <button className="px-5 py-2 rounded-lg bg-glass-100 border border-white/5 text-gray-300 text-xs font-bold tracking-wider hover:bg-glass-300 hover:text-white transition-all">CANON</button>
                <button className="px-5 py-2 rounded-lg bg-glass-100 border border-white/5 text-gray-300 text-xs font-bold tracking-wider hover:bg-glass-300 hover:text-white transition-all">PENTAX</button>
                <button className="px-5 py-2 rounded-lg bg-glass-100 border border-white/5 text-gray-300 text-xs font-bold tracking-wider hover:bg-glass-300 hover:text-white transition-all">OLYMPUS</button>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3 px-4 border-l border-white/10">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Sort by</span>
              <select className="bg-transparent text-xs text-white uppercase tracking-wider font-bold outline-none cursor-pointer">
                <option className="bg-gray-900">Featured</option>
                <option className="bg-gray-900">Price: Low to High</option>
                <option className="bg-gray-900">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, index) => {
            const displayName = isCameraView
              ? extractCameraName(product.title)
              : extractLensName(product.title);

            const subInfo = isCameraView
              ? (product.Tag.includes('フルサイズ') ? 'Full Frame' : 'APS-C')
              : `${extractMountType(product.title, product.Tag)} / ${product.condition}`;

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
                      {displayName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                      {subInfo}
                    </p>
                  </div>
                  <span className="font-mono text-white">{formatPrice(product.price)}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="mt-20 text-center fade-up-element">
          <button className="px-8 py-3 rounded-full border border-white/20 text-sm font-bold tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-95">
            LOAD MORE
          </button>
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
