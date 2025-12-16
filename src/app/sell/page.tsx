import Link from 'next/link';
import AnimationScripts from '@/components/AnimationScripts';

export default function SellPage() {
  return (
    <div className="scroll-smooth">
      <AnimationScripts />

      {/* Background Effects */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-cyan-900 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-slate-900 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
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
            <Link href="/maintenance" className="hover:text-white transition-colors">
              Service
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
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516961642265-531546e84af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Camera Collection"
            className="w-full h-full object-cover object-center opacity-60 grayscale contrast-125"
            style={{ objectPosition: 'center 70%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f11] via-transparent to-[#0f0f11]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto fade-up-element">
          <div className="inline-block border-b border-cyan-500/50 pb-1 mb-8">
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-cyan-400 font-bold">Premium Buyback Program</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight mb-8">
            Pass the Legacy<br />
            <span className="text-stroke text-white/5">to the Next Artist.</span>
          </h1>
          <p className="text-gray-300 text-base md:text-xl font-light tracking-wide leading-relaxed max-w-2xl mx-auto mb-10">
            あなたの愛機を、次の表現者へ。<br />
            SONY Eマウントとオールドレンズに特化することで、<br />
            市場最高水準の買取価格を実現しました。
          </p>
          <a
            href="#assessment"
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold tracking-widest text-black bg-white rounded-full hover:bg-cyan-50 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            GET A FREE QUOTE
          </a>
        </div>
      </header>

      {/* Why We Pay More Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="fade-up-element">
              <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
                Why we pay <span className="text-cyan-400">More</span>
                <br />
                than others.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                一般的なカメラ店は、あらゆるメーカーのあらゆる機種を買い取ります。しかし、それは「不良在庫のリスク」を抱えることを意味し、そのリスクコストは買取価格の低下としてお客様に転嫁されます。
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                SATORI CAMERAは違います。私たちは
                <strong className="text-white">「SONY Eマウント」と「価値あるオールドレンズ」しか買い取りません。</strong>
              </p>
              <p className="text-gray-400 leading-relaxed">
                専門特化することで在庫回転率を極限まで高め、中間マージンを排除。その浮いたコストを、すべて買取価格に還元しています。
              </p>
            </div>

            <div className="fade-up-element delay-100">
              <div className="bg-glass-100 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-900/30 rounded-full blur-3xl group-hover:bg-cyan-800/40 transition-colors"></div>

                <h3 className="text-xl font-bold mb-8 text-center tracking-widest">NET INCOME COMPARISON</h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 opacity-60">
                    <div className="flex items-center">
                      <span className="text-xs font-bold uppercase tracking-wider w-24">Mercari / Apps</span>
                    </div>
                    <div className="text-right text-xs md:text-sm text-gray-400">
                      <div className="mb-1">Sold Price: ¥100,000</div>
                      <div className="text-red-400">- Fee (10%): ¥10,000</div>
                      <div className="text-red-400">- Shipping: ¥1,000</div>
                      <div className="border-t border-white/10 mt-1 pt-1 font-bold text-white">Net: ¥89,000</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 opacity-60">
                    <div className="flex items-center">
                      <span className="text-xs font-bold uppercase tracking-wider w-24">General Shop</span>
                    </div>
                    <div className="text-right text-xs md:text-sm text-gray-400">
                      <div className="mb-1">Assessment: Low</div>
                      <div className="text-gray-500">High Overhead Cost</div>
                      <div className="text-gray-500">Slow Turnover Risk</div>
                      <div className="border-t border-white/10 mt-1 pt-1 font-bold text-white">Net: ¥85,000</div>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 shadow-lg transform scale-105">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-cyan-400 rounded-full"></div>
                    <div className="flex items-center">
                      <span className="text-sm font-bold uppercase tracking-wider w-24 text-white">SATORI</span>
                    </div>
                    <div className="text-right text-sm md:text-base">
                      <div className="mb-1 text-cyan-100">Specialist Offer</div>
                      <div className="text-cyan-300 font-bold">+ No Fees</div>
                      <div className="text-cyan-300 font-bold">+ Free Shipping</div>
                      <div className="border-t border-white/20 mt-2 pt-1 font-mono text-2xl font-bold text-white text-shadow-glow">
                        ¥105,000
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-6">※ 上記は一例です。実際の価格はモデルや状態により異なります。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Buy Section */}
      <section className="py-24 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up-element">
            <span className="text-cyan-400 font-bold tracking-widest text-xs uppercase mb-2 block">Specialized In</span>
            <h2 className="text-3xl md:text-4xl font-serif">What We Buy</h2>
            <p className="text-gray-400 mt-4 text-sm">以下の3カテゴリーに限定することで、高価買取を実現しています。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group fade-up-element delay-100">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Sony Alpha"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">Sony Alpha Bodies</h3>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                α7シリーズ、α9、α1などのフルサイズミラーレス機。最新モデルから初代モデルまで、Sony製Eマウントボディ全般。
              </p>
            </div>

            <div className="group fade-up-element delay-200">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1624823183487-73595ae15053?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="G Master Lens"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">E-mount Lenses</h3>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                G Master, Zeiss, Sigma Artなどの高性能Eマウントレンズ。特に単焦点レンズはプラス査定いたします。
              </p>
            </div>

            <div className="group fade-up-element delay-300">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1495707902641-75cac588d2e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Old Lens"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">Vintage Primes</h3>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Helios, Super Takumar, Leica, Zeiss
                Jenaなどのオールド単焦点レンズ。カビやクモリがあっても修理前提で買取可能です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Process Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif mb-16 text-center fade-up-element">Simple Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-900 to-slate-900 -z-10"></div>

            <div className="text-center fade-up-element delay-100 bg-[#0f0f11] md:bg-transparent pt-4 md:pt-0">
              <div className="w-16 h-16 mx-auto bg-glass-200 border border-white/10 rounded-full flex items-center justify-center mb-6 text-xl font-bold text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Web Assessment</h3>
              <p className="text-xs text-gray-400">
                フォームから機材情報を送信。
                <br />
                24時間以内に査定額をご連絡。
              </p>
            </div>

            <div className="text-center fade-up-element delay-200 bg-[#0f0f11] md:bg-transparent pt-4 md:pt-0">
              <div className="w-16 h-16 mx-auto bg-glass-200 border border-white/10 rounded-full flex items-center justify-center mb-6 text-xl font-bold text-white">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">Free Shipping</h3>
              <p className="text-xs text-gray-400">
                梱包キットをお送りします。
                <br />
                着払いで発送してください。
              </p>
            </div>

            <div className="text-center fade-up-element delay-300 bg-[#0f0f11] md:bg-transparent pt-4 md:pt-0">
              <div className="w-16 h-16 mx-auto bg-glass-200 border border-white/10 rounded-full flex items-center justify-center mb-6 text-xl font-bold text-white">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Final Inspection</h3>
              <p className="text-xs text-gray-400">
                専門スタッフによる実機確認。
                <br />
                最終金額を確定します。
              </p>
            </div>

            <div className="text-center fade-up-element delay-400 bg-[#0f0f11] md:bg-transparent pt-4 md:pt-0">
              <div className="w-16 h-16 mx-auto bg-cyan-900 border border-cyan-500/30 rounded-full flex items-center justify-center mb-6 text-xl font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                4
              </div>
              <h3 className="text-lg font-bold mb-2 text-cyan-100">Quick Payment</h3>
              <p className="text-xs text-gray-400">
                合意後、即日振込。
                <br />
                手数料は一切かかりません。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Form Section */}
      <section id="assessment" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent pointer-events-none"></div>

        <div className="max-w-3xl mx-auto bg-glass-100 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl fade-up-element">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif mb-4">Start Your Assessment</h2>
            <p className="text-gray-400 text-sm">
              まずは概算見積もりから。匿名でも可能です。
              <br />
              他店の見積もりがある場合は、お知らせください。
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer">
                <input type="radio" name="type" className="peer sr-only" defaultChecked />
                <div className="rounded-lg border border-white/20 bg-white/5 p-4 text-center hover:bg-white/10 peer-checked:bg-cyan-900/50 peer-checked:border-cyan-400 transition-all">
                  <span className="text-sm font-bold">Camera Body</span>
                </div>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="type" className="peer sr-only" />
                <div className="rounded-lg border border-white/20 bg-white/5 p-4 text-center hover:bg-white/10 peer-checked:bg-cyan-900/50 peer-checked:border-cyan-400 transition-all">
                  <span className="text-sm font-bold">Lens</span>
                </div>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Product Name / Model</label>
              <input
                type="text"
                placeholder="e.g. Sony a7III / Helios 44-2"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Condition</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none">
                <option className="bg-[#1a1a1a]">Mint (未使用に近い)</option>
                <option className="bg-[#1a1a1a]">Excellent (目立つ傷なし)</option>
                <option className="bg-[#1a1a1a]">Good (使用感あり)</option>
                <option className="bg-[#1a1a1a]">Poor / Broken (故障・カビあり)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Accessories / Notes</label>
              <textarea
                rows={3}
                placeholder="箱、付属品の有無や、気になる点（傷、動作不良など）をご記入ください。"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-bold tracking-widest rounded-lg hover:bg-cyan-50 transition-all transform hover:scale-[1.01] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                REQUEST PRICE
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">By clicking Request, you agree to our Terms of Service.</p>
            </div>
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
          <Link href="/maintenance" className="hover:text-white transition-colors">
            Service
          </Link>
          <Link href="/sell" className="hover:text-white transition-colors">
            Sell
          </Link>
        </div>
        <p className="text-gray-600 text-xs tracking-wide">&copy; 2024 SATORI CAMERA. All rights reserved.</p>
      </footer>
    </div>
  );
}
