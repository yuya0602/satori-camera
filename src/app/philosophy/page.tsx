import Link from 'next/link';
import AnimationScripts from '@/components/AnimationScripts';

export default function PhilosophyPage() {
  return (
    <div className="scroll-smooth">
      <AnimationScripts />

      {/* Background Effects */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-900 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-900 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-900/30 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="bg-noise"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-4">
          <Link href="/" className="text-2xl font-bold tracking-widest text-white mix-blend-difference z-50">
            SATORI
          </Link>
          <Link href="/" className="group flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 hover:text-white transition-colors z-50 uppercase">
            <span className="w-8 h-[1px] bg-gray-600 group-hover:bg-white transition-colors"></span>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1495012379376-194a416fcc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Abstract Light"
            className="w-full h-full object-cover opacity-40 scale-110 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f11] via-transparent to-[#0f0f11]"></div>
        </div>

        <div className="relative z-10 text-center fade-up-element">
          <p className="text-xs md:text-sm tracking-[0.4em] text-gray-400 mb-8 uppercase">Our Philosophy</p>
          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight mb-8">
            Imperfect<br />
            <span className="italic text-gray-500 font-sans font-thin">Perfection</span>
          </h1>
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent mx-auto mt-8"></div>
        </div>
      </header>

      {/* Section 1 */}
      <section className="py-24 md:py-40 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="fade-up-element relative">
            <div className="absolute -left-8 top-0 h-full w-[1px] bg-white/10 hidden md:block"></div>
            <div className="bg-glass-100 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-lg">
              <span className="text-5xl text-white/10 font-serif absolute top-4 left-6 -z-10">01</span>
              <h2 className="text-2xl md:text-3xl font-serif font-medium mb-8 leading-normal">
                数値では測れない、<br />
                「空気」を写す。
              </h2>
              <div className="space-y-6 text-gray-400 text-sm md:text-base font-light leading-loose text-justify">
                <p>
                  現代のレンズ設計は、収差を徹底的に排除し、解像度を極限まで高めることを目指しています。それは技術の勝利であり、素晴らしいことですが、時として写真はあまりに「完璧」すぎて、息苦しさを感じることがあります。
                </p>
                <p>
                  私たちが扱うオールドレンズは、不完全です。
                  逆光でフレアが入り、周辺は少し流れ、色は滲むかもしれません。しかし、その「不完全さ」こそが、写真に体温を与え、記憶の中の情景とリンクするのです。
                </p>
              </div>
            </div>
          </div>

          <div className="fade-up-element delay-200 relative group">
            <div className="absolute inset-0 bg-blue-500/10 transform translate-x-4 translate-y-4 rounded-lg transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1516961642265-531546e84af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Through the glass"
              className="relative w-full rounded-lg grayscale hover:grayscale-0 transition-all duration-1000 object-cover aspect-[3/4]"
            />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden my-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1533158388470-9a56699990c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Texture"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center fade-up-element">
          <p className="font-serif text-2xl md:text-4xl leading-relaxed text-gray-200">
            &quot;Photography is the story I fail to put into words.&quot;
          </p>
          <p className="mt-6 text-sm tracking-widest text-gray-500 uppercase">- Destin Sparks</p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-24 md:py-40 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 fade-up-element relative group">
            <div className="absolute inset-0 bg-amber-900/10 transform -translate-x-4 translate-y-4 rounded-lg transition-transform group-hover:-translate-x-2 group-hover:translate-y-2 duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Craftsman repairing"
              className="relative w-full rounded-lg opacity-80 group-hover:opacity-100 transition-all duration-1000 object-cover aspect-[4/3]"
            />
          </div>

          <div className="order-1 md:order-2 fade-up-element delay-200 relative">
            <div className="bg-glass-100 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-lg">
              <span className="text-5xl text-white/10 font-serif absolute top-4 left-6 -z-10">02</span>
              <h2 className="text-2xl md:text-3xl font-serif font-medium mb-8 leading-normal">
                時を超えて、<br />
                再び光を灯す。
              </h2>
              <div className="space-y-6 text-gray-400 text-sm md:text-base font-light leading-loose text-justify">
                <p>
                  「SATORI」という名前には、古いレンズが長い眠りから覚め、再び現代の光を捉える瞬間の「悟り（Awakening）」という意味を込めています。
                </p>
                <p>
                  私たちは単なる中古屋ではありません。カビや曇りに覆われたガラスを分解し、清掃し、ヘリコイドのグリスを入れ替える。それは外科手術のような繊細さと、楽器の調律のような感性を要する作業です。
                </p>
                <p>
                  50年前のガラスが、最新の4Kセンサーと出会うとき。そこに生まれる化学反応こそが、私たちが提供したい体験です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-up-element">
            <h3 className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-4">Our Standard</h3>
            <h2 className="text-3xl font-serif">The SATORI Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="relative fade-up-element delay-100 text-center">
              <div className="w-24 h-24 mx-auto bg-[#0f0f11] border border-white/10 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <span className="font-serif text-2xl text-gray-300">I</span>
              </div>
              <h4 className="text-lg font-medium mb-4">Sourcing</h4>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                東欧、ドイツ、日本。世界中から状態の良い原石だけを厳選して調達。
              </p>
            </div>

            <div className="relative fade-up-element delay-200 text-center">
              <div className="w-24 h-24 mx-auto bg-[#0f0f11] border border-white/10 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <span className="font-serif text-2xl text-gray-300">II</span>
              </div>
              <h4 className="text-lg font-medium mb-4">Restoration</h4>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                専門技師による完全な分解清掃。光学系のクリアさと操作性の復活。
              </p>
            </div>

            <div className="relative fade-up-element delay-300 text-center">
              <div className="w-24 h-24 mx-auto bg-[#0f0f11] border border-white/10 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <span className="font-serif text-2xl text-gray-300">III</span>
              </div>
              <h4 className="text-lg font-medium mb-4">Test Shooting</h4>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                Sony αシリーズ実機による撮影テスト。描写と無限遠の確認。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
        <div className="relative z-10 fade-up-element">
          <h2 className="text-4xl md:text-6xl font-serif font-light mb-8">Find Your Light</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            あなただけの「味」を持つレンズとの出会いが、ここにあります。
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold tracking-widest text-white transition-all duration-300 border border-white/20 rounded-full hover:bg-white hover:text-black hover:scale-105 backdrop-blur-sm"
          >
            VIEW COLLECTION
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold tracking-widest text-white">
              SATORI
            </Link>
            <p className="text-gray-600 text-xs mt-2 tracking-wide">Tokyo-based Refurbished Lens Specialist.</p>
          </div>
          <div className="flex space-x-8 text-xs text-gray-500 tracking-widest uppercase">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-white transition-colors">
              Collection
            </Link>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <p className="text-gray-700 text-xs tracking-wide">&copy; 2024 SATORI CAMERA.</p>
        </div>
      </footer>
    </div>
  );
}
