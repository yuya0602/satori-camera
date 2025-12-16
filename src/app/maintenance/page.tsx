import Link from 'next/link';
import AnimationScripts from '@/components/AnimationScripts';

export default function MaintenancePage() {
  return (
    <div className="scroll-smooth">
      <AnimationScripts />

      {/* Background Effects */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-slate-900 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-900 rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>
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
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
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
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/maintenance.webp"
            alt="Vintage Lens Restoration"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/70 to-[#0f0f11]/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 fade-up-element">
          <div className="inline-flex items-center space-x-2 border border-amber-500/30 bg-amber-900/10 backdrop-blur-md px-4 py-1 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-amber-500">Service Status: Accepting</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-6">
            The Art of<br />Restoration
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base font-light tracking-wide leading-relaxed">
            眠っているレンズを、目覚めさせる。<br />
            SATORIの職人が、あなたの愛機に新たな命を吹き込みます。
          </p>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="fade-up-element">
            <h2 className="text-3xl font-serif mb-8">
              Not just fixing.<br />
              <span className="text-gray-500">Preserving history.</span>
            </h2>
            <div className="space-y-6 text-gray-400 font-light leading-loose text-justify">
              <p>
                オールドレンズの内部は、繊細な時計仕掛けのような世界です。固着したヘリコイド、エレメントを覆うカビ、劣化したグリス。これらは単なる汚れではなく、長い時間の痕跡です。
              </p>
              <p>
                私たちは、オリジナルのガラス硝材を可能な限り温存する手法を取ります。過度な研磨は行わず、レンズ本来のコーティングと「味」を残しながら、光学的なクリアさを取り戻します。
              </p>
              <p>
                あなたの父が使っていたレンズ、リサイクルショップで見つけた名もなきレンズ。その一本一本に敬意を払い、次の50年も使い続けられる状態へと仕上げます。
              </p>
            </div>
          </div>
          <div className="fade-up-element delay-100 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-lg blur-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Craftsman Hands"
              className="relative w-full rounded-lg border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Service Menu */}
      <section className="py-24 px-6 bg-white/5 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up-element">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Service Menu</h2>
            <p className="text-gray-500 text-sm">レンズの状態や構造により変動する場合があります。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Light Maintenance */}
            <div className="bg-glass-100 border border-white/10 rounded-2xl p-8 fade-up-element delay-100 hover:bg-glass-200 transition-colors">
              <h3 className="text-xl font-bold mb-2 text-gray-300">Light Maintenance</h3>
              <div className="text-3xl font-mono font-bold mb-6">
                ¥8,800<span className="text-sm text-gray-500 font-sans font-normal ml-1">~</span>
              </div>
              <p className="text-sm text-gray-400 mb-8 h-12">軽度のチリ混入の除去や、外観のクリーニングを中心とした基本プラン。</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> レンズ表面クリーニング
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> 内部チリ除去（前玉のみ）
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> 外観清掃
                </li>
                <li className="flex items-center opacity-50">
                  <span className="mr-2">×</span> ヘリコイドグリス交換
                </li>
              </ul>
              <a
                href="#request-form"
                className="block text-center w-full py-3 border border-white/20 rounded-lg text-sm hover:bg-white hover:text-black transition-all"
              >
                REQUEST
              </a>
            </div>

            {/* Full Overhaul (Recommended) */}
            <div className="bg-glass-200 border border-amber-500/30 rounded-2xl p-8 relative fade-up-element delay-200 transform md:-translate-y-4 shadow-[0_0_50px_rgba(245,158,11,0.1)]">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg">
                Recommended
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Full Overhaul</h3>
              <div className="text-3xl font-mono font-bold mb-6 text-amber-400">
                ¥18,000<span className="text-sm text-gray-500 font-sans font-normal ml-1">~</span>
              </div>
              <p className="text-sm text-gray-300 mb-8 h-12">完全分解を行い、光学系と駆動系を徹底的にリフレッシュする標準プラン。</p>
              <ul className="space-y-3 text-sm text-gray-200 mb-8">
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> 全エレメント分解清掃
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> カビ・クモリ除去
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> ヘリコイドグリス入替
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> 無限遠調整
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> 絞り羽根油シミ除去
                </li>
              </ul>
              <a
                href="#request-form"
                className="block text-center w-full py-3 bg-amber-600 text-white font-bold rounded-lg text-sm hover:bg-amber-500 transition-all shadow-lg"
              >
                REQUEST QUOTE
              </a>
            </div>

            {/* Repair & Restore */}
            <div className="bg-glass-100 border border-white/10 rounded-2xl p-8 fade-up-element delay-300 hover:bg-glass-200 transition-colors">
              <h3 className="text-xl font-bold mb-2 text-gray-300">Repair & Restore</h3>
              <div className="text-3xl font-mono font-bold mb-6">
                Ask<span className="text-sm text-gray-500 font-sans font-normal ml-1"></span>
              </div>
              <p className="text-sm text-gray-400 mb-8 h-12">バルサム切れ、部品破損、絞り固着など、重度な症状向けの修理プラン。</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> 固着部品の修理
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> バルサム再接着
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> 部品製作（要相談）
                </li>
                <li className="flex items-center">
                  <span className="text-amber-500 mr-2">✓</span> 鏡筒の歪み矯正
                </li>
              </ul>
              <a
                href="#request-form"
                className="block text-center w-full py-3 border border-white/20 rounded-lg text-sm hover:bg-white hover:text-black transition-all"
              >
                CONSULT US
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif mb-16 text-center fade-up-element">The Process</h2>

          <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-12">
            <div className="relative pl-8 md:pl-12 fade-up-element delay-100">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-600 ring-4 ring-[#0f0f11]"></span>
              <h3 className="text-xl font-bold text-white mb-2">1. Request & Shipping</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                下部のフォームよりお申し込みください。仮見積もりをお送りしますので、ご了承いただけましたら、レンズを厳重に梱包し、当店までお送りください。
              </p>
            </div>

            <div className="relative pl-8 md:pl-12 fade-up-element delay-200">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-[#0f0f11] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              <h3 className="text-xl font-bold text-white mb-2">2. Inspection & Formal Quote</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                到着後、専門スタッフが実機を診断します。内部の状態（カビの侵食度合いなど）を確認し、正式な見積額と納期をご連絡します。
              </p>
            </div>

            <div className="relative pl-8 md:pl-12 fade-up-element delay-300">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-[#0f0f11] shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
              <h3 className="text-xl font-bold text-white mb-2">3. Restoration Work</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                作業を開始します。通常2〜3週間程度お時間をいただきます。作業中に予期せぬ不具合が見つかった場合は、直ちにご相談いたします。
              </p>
            </div>

            <div className="relative pl-8 md:pl-12 fade-up-element delay-300">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white ring-4 ring-[#0f0f11]"></span>
              <h3 className="text-xl font-bold text-white mb-2">4. Payment & Delivery</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                作業完了後、テスト撮影結果とともにご報告します。お支払い確認後、丁寧に梱包して返送いたします。6ヶ月の再修理保証が付きます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section id="request-form" className="py-24 px-6 bg-glass-100 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center fade-up-element">
          <h2 className="text-3xl font-serif mb-6">Start Restoration</h2>
          <p className="text-gray-400 mb-10 text-sm">
            まずはレンズの情報をお知らせください。<br />
            24時間以内に概算のお見積もりをお送りします。
          </p>

          <form className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Lens Manufacturer</label>
                <input
                  type="text"
                  placeholder="e.g. Carl Zeiss"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Model Name / Focal Length</label>
                <input
                  type="text"
                  placeholder="e.g. Jena 50mm f2.8"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Condition / Symptoms</label>
              <textarea
                rows={4}
                placeholder="気になる症状（カビ、ヘリコイドが重い、絞りが動かない等）を詳しくご記入ください。"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Your Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-bold tracking-widest rounded-lg hover:bg-gray-200 transition-all transform hover:scale-[1.01] mt-4 shadow-lg"
            >
              REQUEST ESTIMATE
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-10 px-6 relative z-10 text-center">
        <Link href="/" className="text-xl font-bold tracking-widest text-white mb-4 block">
          SATORI
        </Link>
        <div className="flex justify-center space-x-6 text-xs text-gray-500 mb-6">
          <Link href="/products" className="hover:text-white transition-colors">
            Store
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            Journal
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        <p className="text-gray-600 text-xs tracking-wide">&copy; 2024 SATORI CAMERA. All rights reserved.</p>
      </footer>
    </div>
  );
}
