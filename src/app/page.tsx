import Link from 'next/link';
import AnimationScripts from '@/components/AnimationScripts';
import CartIcon from '@/components/CartIcon';
import { getMercariProducts, getFeaturedProducts, getSonyCameras, getLenses, extractLensName, extractMountType, extractCameraName, formatPrice } from '@/lib/mercari';

export default async function Home() {
  const allLenses = await getLenses();
  const featuredProducts = await getFeaturedProducts();
  const sonyAllCameras = await getSonyCameras();
  const sonyCameras = sonyAllCameras.slice(0, 3);
  const featuredDisplay = featuredProducts.slice(0, 3);
  const newArrivals = allLenses.slice(0, 3);
  return (
    <div className="scroll-smooth">
      <AnimationScripts />
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="bg-noise"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-glass-200 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 shadow-lg">
          <a href="#" className="text-2xl font-bold tracking-widest text-white">SATORI</a>
          <div className="hidden md:flex space-x-8 text-sm tracking-widest uppercase text-gray-300">
            <a href="#philosophy" className="hover:text-white transition-colors duration-300">Philosophy</a>
            <a href="#collection" className="hover:text-white transition-colors duration-300">Collection</a>
            <a href="/maintenance" className="hover:text-white transition-colors duration-300">Maintenance</a>
            <a href="/blog" className="hover:text-white transition-colors duration-300">Journal</a>
            <a href="/contact" className="hover:text-white transition-colors duration-300">Contact</a>
            <a href="/products" className="text-white font-semibold">Store</a>
            <div className="ml-4">
              <CartIcon />
            </div>
          </div>
          <div className="md:hidden text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Camera Lens"
            className="w-full h-full object-cover opacity-60 scale-105 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="fade-up-element text-sm md:text-base tracking-[0.3em] uppercase text-gray-400 mb-6">
            Refurbished Old Lenses & Sony E-mount
          </p>
          <h1 className="fade-up-element delay-100 text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
            Renaissance<br />
            <span className="text-stroke text-white/10">of Light</span>
          </h1>
          <p className="fade-up-element delay-200 text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            現代のセンサーに、伝説の描写を。<br />
            オールドレンズの「味」と、最新の技術が交差する場所。
          </p>
          <div className="fade-up-element delay-300">
            <a href="#collection" className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white transition-all duration-200 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 hover:scale-105 hover:border-white/40 backdrop-blur-sm overflow-hidden">
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative tracking-widest">VIEW COLLECTION</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-50 animate-bounce">
          <span className="text-xs tracking-widest mb-2">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </header>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative fade-up-element">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1554048612-387768052bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Photographer"
              className="relative rounded-xl border border-white/10 shadow-2xl w-full object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="order-1 md:order-2 fade-up-element delay-100">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Timeless Glass,<br />
              <span className="text-gray-500">Modern Soul.</span>
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed font-light">
              <p>
                デジタル写真の鮮明さは素晴らしいものですが、時として「温度」が不足していると感じることはありませんか?
              </p>
              <p>
                SATORI CAMERAは、Helios、Zeiss、Leicaといった20世紀の銘玉(名作レンズ)を、現代のSony Eマウントボディ向けに完全整備して提供します。
              </p>
              <p>
                フレア、ゴースト、独特のボケ味。これらはノイズではなく、写真に物語を与える「声」です。
              </p>
            </div>
            <div className="mt-10">
              <a href="/philosophy" className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors tracking-widest text-sm">READ OUR STORY</a>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-32 px-6 relative bg-white/5 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 fade-up-element">
            <div>
              <span className="text-blue-400 tracking-widest text-xs font-bold uppercase mb-2 block">Curated Selection</span>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Lenses</h2>
            </div>
            <Link href="/featured" className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors">View All Items -&gt;</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDisplay.map((product, index) => {
              const lensName = extractLensName(product.title);
              const mountType = extractMountType(product.title, product.Tag);
              return (
                <Link
                  key={product.product_id}
                  href={`/products/${product.product_id}`}
                  className={`group fade-up-element delay-${(index + 1) * 100}`}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-glass-100 border border-white/10 shadow-xl transition-all duration-500 hover:bg-glass-200 hover:border-white/30 hover:-translate-y-2">
                    <div className="aspect-[4/3] overflow-hidden">
                      {product.image_01 ? (
                        <img
                          src={product.image_01}
                          alt={lensName}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white">{lensName}</h3>
                        <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300 backdrop-blur-sm">{mountType}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.title}</p>
                      <div className="flex justify-between items-center border-t border-white/10 pt-4">
                        <span className="text-lg font-mono">{formatPrice(product.price)}</span>
                        <span className="text-xs text-blue-300 tracking-wider group-hover:underline">VIEW DETAILS</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/featured" className="text-sm text-gray-400 hover:text-white transition-colors border-b border-gray-600 pb-1">View All Items -&gt;</Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section id="new-arrivals" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 fade-up-element">
            <div>
              <span className="text-blue-400 tracking-widest text-xs font-bold uppercase mb-2 block">Just Arrived</span>
              <h2 className="text-3xl md:text-4xl font-bold">New Arrivals: Lenses</h2>
            </div>
            <a href="/products" className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors">View All Items -&gt;</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newArrivals.map((product, index) => (
              <Link key={product.product_id} href={`/products/${product.product_id}`} className={`group fade-up-element delay-${(index + 1) * 100} cursor-pointer block`}>
                <div className="relative overflow-hidden rounded-2xl bg-glass-100 border border-white/10 shadow-xl transition-all duration-500 hover:bg-glass-200 hover:border-white/30 hover:-translate-y-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    {product.image_01 ? (
                      <img
                        src={product.image_01}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{extractLensName(product.title)}</h3>
                      <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300 backdrop-blur-sm">{extractMountType(product.title, product.Tag)}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.title}</p>
                    <div className="flex justify-between items-center border-t border-white/10 pt-4">
                      <span className="text-lg font-mono">{formatPrice(product.price)}</span>
                      <span className="text-xs text-blue-300 tracking-wider group-hover:underline">VIEW DETAILS</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <a href="/products" className="text-sm text-gray-400 hover:text-white transition-colors border-b border-gray-600 pb-1">View All Items -&gt;</a>
          </div>
        </div>
      </section>

      {/* Sony Cameras Section */}
      <section id="sony-cameras" className="py-32 px-6 relative bg-white/5 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 fade-up-element">
            <div>
              <span className="text-blue-400 tracking-widest text-xs font-bold uppercase mb-2 block">Premium Selection</span>
              <h2 className="text-3xl md:text-4xl font-bold">Sony E-mount Camera</h2>
            </div>
            <a href="/products?category=camera" className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors">View All Items -&gt;</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sonyCameras.map((product, index) => (
              <div key={product.product_id} className={`group fade-up-element delay-${(index + 1) * 100} cursor-pointer`}>
                <Link href={`/products/${product.product_id}`} className="block">
                  <div className="relative overflow-hidden rounded-2xl bg-glass-100 border border-white/10 shadow-xl transition-all duration-500 hover:bg-glass-200 hover:border-white/30 hover:-translate-y-2">
                    <div className="aspect-[4/3] overflow-hidden">
                      {product.image_01 ? (
                        <img
                          src={product.image_01}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white">{extractCameraName(product.title)}</h3>
                        <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300 backdrop-blur-sm">
                          {/* Display sensor size if available in tag, or simple camera tag */}
                          {product.Tag.includes('フルサイズ') ? 'Full Frame' : 'APS-C'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.title}</p>
                      <div className="flex justify-between items-center border-t border-white/10 pt-4">
                        <span className="text-lg font-mono">{formatPrice(product.price)}</span>
                        <span className="text-xs text-blue-300 tracking-wider group-hover:underline">VIEW DETAILS</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Show message if no cameras found */}
          {sonyCameras.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              Recently sold out. Restocking soon.
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <a href="/products?category=camera" className="text-sm text-gray-400 hover:text-white transition-colors border-b border-gray-600 pb-1">View All Items -&gt;</a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="City Bokeh"
            className="w-full h-full object-cover opacity-50 fixed-bg-effect"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 text-center px-4 fade-up-element">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Capture the Invisible</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 font-light">
            私たちの整備士は、各レンズを極限まで分解・清掃し、<br />ソニーαシリーズでの動作を保証しています。
          </p>
          <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors transform hover:scale-105 duration-200">
            DISCOVER MORE
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] pt-20 pb-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="text-3xl font-bold tracking-widest text-white mb-6 block">SATORI</a>
            <p className="text-gray-500 max-w-sm mb-6">
              SATORI CAMERA is a premium select shop for refurbished vintage lenses specialized for Sony E-mount system. Based in Tokyo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-colors">IG</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-colors">TW</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-colors">FB</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Shop</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">All Lenses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mount Adapters</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="/maintenance" className="hover:text-white transition-colors">Lens Maintenance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; 2024 SATORI CAMERA. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
