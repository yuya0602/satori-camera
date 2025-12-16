import Link from 'next/link';
import AnimationScripts from '@/components/AnimationScripts';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
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
      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Info */}
          <div className="fade-up-element pt-10">
            <p className="text-xs tracking-[0.3em] uppercase text-blue-300 mb-6 font-bold">Contact Us</p>
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-8">
              Let&apos;s start a<br />
              <span className="text-gray-500 italic font-sans">Conversation.</span>
            </h1>
            <p className="text-gray-400 font-light leading-relaxed mb-12 max-w-md">
              商品に関するご質問、レンズの整備状況、あるいはただ単にオールドレンズの魅力について語りたい場合も。<br />
              お気軽にご連絡ください。
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-1">Email</h3>
                  <a
                    href="mailto:mail@satori-camera-and-lenses.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    mail@satori-camera-and-lenses.com
                  </a>
                  <p className="text-xs text-gray-600 mt-1">Usually reply within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-1">Office</h3>
                  <p className="text-gray-400">
                    2-10-1 Nakameguro, Meguro-ku<br />
                    Tokyo, Japan 153-0061
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 relative w-full h-40 rounded-2xl overflow-hidden hidden lg:block opacity-60">
              <img
                src="https://images.unsplash.com/photo-1517488031175-f938c032644b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                className="w-full h-full object-cover grayscale opacity-50"
                alt="Texture"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f11] to-transparent"></div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="fade-up-element delay-200">
            <ContactForm />
          </div>
        </div>

        {/* Help Card */}
        <div className="fixed bottom-6 right-6 z-30 hidden lg:block fade-up-element delay-300">
          <div className="bg-glass-200 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-72 shadow-2xl">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Before you ask</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex justify-between">
                  Shipping Policy <span>→</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex justify-between">
                  Warranty Info <span>→</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex justify-between">
                  Lens Grading <span>→</span>
                </a>
              </li>
            </ul>
          </div>
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
