import Link from 'next/link';
import AnimationScripts from '@/components/AnimationScripts';
import ConciergeForm from '@/components/ConciergeForm';

export default function ConciergePage() {
  return (
    <div className="scroll-smooth">
      <AnimationScripts />

      {/* Background Effects */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-indigo-900 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-900 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
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
            <Link href="/sell" className="hover:text-white transition-colors">
              Sell
            </Link>
            <Link href="/concierge" className="text-white border-b border-white pb-1">
              Concierge
            </Link>
          </div>
          <div className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1485627941502-d2e6429fa2ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Strategic Vision"
            className="w-full h-full object-cover opacity-40 grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto fade-up-element">
          <div className="inline-block px-4 py-1 mb-6 border border-indigo-500/30 rounded-full bg-indigo-900/20 backdrop-blur-md">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-300">Order Sales & Consulting</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-8">
            Your Vision,
            <br />
            <span className="text-gray-500 italic font-sans font-light">Strategically Curated.</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg font-light tracking-wide leading-relaxed max-w-2xl mx-auto mb-10">
            機材選びは、投資です。
            <br />
            元コンサルタントの視点と、SONY専門店の知見で、
            <br />
            あなたの「撮りたい」を最短距離で実現する最適解を提案します。
          </p>
          <a
            href="#consultation-form"
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold tracking-widest text-white border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
          >
            START CONSULTATION
          </a>
        </div>
      </header>

      {/* Rational Selection Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="fade-up-element">
            <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight">
              Rational Selection for
              <br />
              <span className="text-indigo-400">Emotional Results.</span>
            </h2>
            <div className="space-y-6 text-gray-400 font-light leading-loose">
              <p>
                「なんとなく良い写真が撮れそう」という理由で機材を選んでいませんか？
                写真は感性のアートですが、機材選びは論理的な戦略であるべきです。
              </p>
              <p>
                SATORI
                CAMERAのオーナーは、ビジネスコンサルティングのバックグラウンドを持ちます。
                私たちは、あなたの予算（Resource）と撮りたいイメージ（Goal）を分析し、ROI（費用対効果）が最も高い機材構成を提案します。
              </p>
              <p>
                SONYボディの性能を極限まで引き出すEマウントレンズ、あるいはデジタルに「味」を加えるオールドレンズ。
                膨大な選択肢の中から、あなただけの正解を導き出し、市場から良質な個体を調達（Source）して提供します。
              </p>
            </div>
          </div>

          <div className="fade-up-element delay-100 relative">
            <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-3xl"></div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-glass-100 border border-white/10 p-6 rounded-2xl backdrop-blur-lg transform translate-y-8">
                <div className="text-indigo-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">Analysis</h3>
                <p className="text-xs text-gray-400">被写体、環境、出力媒体から必要なスペックを逆算。</p>
              </div>

              <div className="bg-glass-100 border border-white/10 p-6 rounded-2xl backdrop-blur-lg">
                <div className="text-indigo-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">Curation</h3>
                <p className="text-xs text-gray-400">Sony Eマウントとオールドレンズの深い知識で最適解を選定。</p>
              </div>

              <div className="bg-glass-100 border border-white/10 p-6 rounded-2xl backdrop-blur-lg transform translate-y-8">
                <div className="text-indigo-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">Sourcing</h3>
                <p className="text-xs text-gray-400">独自のネットワークで、状態の良い個体のみを厳選調達。</p>
              </div>

              <div className="bg-glass-100 border border-white/10 p-6 rounded-2xl backdrop-blur-lg">
                <div className="text-indigo-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">Result</h3>
                <p className="text-xs text-gray-400">納品後すぐに、理想の画作りを始められる状態へ。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Form */}
      <ConciergeForm />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-10 px-6 relative z-10 text-center">
        <Link href="/" className="text-xl font-bold tracking-widest text-white mb-4 block">
          SATORI
        </Link>
        <div className="flex justify-center space-x-6 text-xs text-gray-500 mb-6">
          <Link href="/products" className="hover:text-white transition-colors">
            Store
          </Link>
          <Link href="/maintenance" className="hover:text-white transition-colors">
            Service
          </Link>
          <Link href="/sell" className="hover:text-white transition-colors">
            Sell
          </Link>
          <Link href="/concierge" className="text-white hover:text-white transition-colors">
            Concierge
          </Link>
        </div>
        <p className="text-gray-600 text-xs tracking-wide">&copy; 2024 SATORI CAMERA. All rights reserved.</p>
      </footer>
    </div>
  );
}
