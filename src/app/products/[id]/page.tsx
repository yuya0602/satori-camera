import { getMercariProducts, extractLensName, extractMountType, formatPrice, extractLensSpecs, parseTags } from '@/lib/mercari';
import { notFound } from 'next/navigation';
import ProductDetailGallery from '@/components/ProductDetailGallery';
import AnimationScripts from '@/components/AnimationScripts';
import Link from 'next/link';
import ProductActions from '@/components/ProductActions';
import CartIcon from '@/components/CartIcon';

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getMercariProducts();
  return products.map((product) => ({
    id: product.product_id,
  }));
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const products = await getMercariProducts();
  const product = products.find(p => p.product_id === id);

  if (!product) {
    notFound();
  }

  // Collect all images (up to 16)
  const images = [
    product.image_01,
    product.image_02,
    product.image_03,
    product.image_04,
    product.image_05,
    product.image_06,
    product.image_07,
    product.image_08,
    product.image_09,
    product.image_10,
    product.image_11,
    product.image_12,
    product.image_13,
    product.image_14,
    product.image_15,
    product.image_16,
  ].filter(Boolean) as string[];

  // Extract specs from title and description
  const lensName = extractLensName(product.title);
  const mountType = extractMountType(product.title, product.Tag);
  const lensSpecs = extractLensSpecs(product.description);
  const tags = parseTags(product.Tag);

  // Process description - remove img tags and convert br tags
  const processedDescription = product.description
    ? product.description
      .replace(/<img[^>]*>/gi, '') // Remove all img tags
      .replace(/<br>/gi, '<br />') // Convert <br> to <br />
      .trim()
    : '';

  return (
    <div className="scroll-smooth">
      <AnimationScripts />

      {/* Background Effects */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="bg-noise"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-40 top-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-glass-200 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 shadow-lg">
          <a href="/" className="text-2xl font-bold tracking-widest text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            SATORI
          </a>
          <div className="flex space-x-6 text-sm tracking-widest uppercase text-gray-300 items-center">
            <CartIcon />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 md:px-8 relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Back to Products Link */}
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            商品一覧に戻る
          </Link>

          <div className="bg-glass-100 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl fade-up-element">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8">

              {/* Image Gallery */}
              <div className="lg:col-span-7 p-4 md:p-8 lg:border-r border-white/5 bg-white/1">
                <ProductDetailGallery images={images} title={product.title} />
              </div>

              {/* Product Info */}
              <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 pointer-events-none"></div>

                <div className="fade-up-element delay-100">
                  <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-md border border-blue-500/20">
                    Refurbished / {mountType}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {lensName}
                  </h1>
                  <div className="space-y-3 mb-8">
                    {/* 購入価格 */}
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-mono font-semibold">{formatPrice(product.price)}</span>
                      <span className="text-xs text-green-400 tracking-wider">IN STOCK</span>
                    </div>
                    {/* レンタル価格 */}
                    {product.rental_price && (
                      <div className="flex items-center space-x-3 bg-glass-100 border border-white/10 rounded-lg px-4 py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="text-xs text-gray-400 block">レンタル（1泊2日）</span>
                          <span className="text-lg font-mono font-medium text-purple-300">¥{formatPrice(product.rental_price)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="fade-up-element delay-200 mb-10 space-y-6 text-gray-300 font-light leading-relaxed">
                  <p className="line-clamp-3">
                    {product.title}
                  </p>
                  {processedDescription && (
                    <div
                      className="text-sm leading-relaxed max-h-96 overflow-y-auto scrollbar-thin"
                      dangerouslySetInnerHTML={{ __html: processedDescription }}
                    />
                  )}
                </div>

                <div className="fade-up-element delay-300 mb-10 border-t border-b border-white/10 py-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-200">Details</h3>
                  <dl className="grid grid-cols-2 gap-y-3 text-sm">
                    <dt className="text-gray-500">Mount Type</dt>
                    <dd className="text-gray-200">{mountType}</dd>
                    {lensSpecs.focalLength && (
                      <>
                        <dt className="text-gray-500">Focal Length</dt>
                        <dd className="text-gray-200">{lensSpecs.focalLength}</dd>
                      </>
                    )}
                    {lensSpecs.maxAperture && (
                      <>
                        <dt className="text-gray-500">Max Aperture</dt>
                        <dd className="text-gray-200">{lensSpecs.maxAperture}</dd>
                      </>
                    )}
                    {lensSpecs.minFocusDistance && (
                      <>
                        <dt className="text-gray-500">Min Focus Distance</dt>
                        <dd className="text-gray-200">{lensSpecs.minFocusDistance}</dd>
                      </>
                    )}
                    <dt className="text-gray-500">Condition</dt>
                    <dd className="text-blue-300">{product.condition}</dd>
                    <dt className="text-gray-500">Product ID</dt>
                    <dd className="text-gray-200 font-mono text-xs">{product.product_id}</dd>
                  </dl>
                </div>

                {tags.length > 0 && (
                  <div className="fade-up-element delay-400 mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-200">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/products/tag/${encodeURIComponent(tag)}`}
                          className="inline-block px-4 py-2 rounded-lg bg-glass-100 border border-white/10 text-xs font-medium tracking-wider text-gray-300 hover:bg-glass-300 hover:text-white hover:border-white/30 transition-all duration-300"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <ProductActions
                  productId={product.product_id}
                  title={product.title}
                  price={parseInt(product.price.replace(/[¥,]/g, ''), 10)}
                  rentalPrice={product.rental_price ? parseInt(product.rental_price.replace(/[¥,]/g, ''), 10) : undefined}
                  image={product.image_01}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-10 px-6 relative z-10 text-center text-gray-600 text-sm">
        <p>&copy; 2024 SATORI CAMERA. All rights reserved.</p>
      </footer>
    </div>
  );
}
