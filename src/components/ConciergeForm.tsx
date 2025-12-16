'use client';

import { useState } from 'react';

export default function ConciergeForm() {
  const [activeTab, setActiveTab] = useState<'consulting' | 'order'>('consulting');

  return (
    <section id="consultation-form" className="py-24 px-6 bg-glass-100 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/5 to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto fade-up-element">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif mb-6">Concierge Request</h2>
          <p className="text-gray-400 text-sm">ご希望に合わせて、2つのモードからお選びください。</p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="bg-black/20 p-1 rounded-full flex space-x-2 border border-white/10">
            <button
              onClick={() => setActiveTab('consulting')}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest transition-all duration-300 ${
                activeTab === 'consulting'
                  ? 'bg-white/10 border border-white/30 text-white'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              CONSULTING (提案希望)
            </button>
            <button
              onClick={() => setActiveTab('order')}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest transition-all duration-300 ${
                activeTab === 'order'
                  ? 'bg-white/10 border border-white/30 text-white'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              ORDER (指名注文)
            </button>
          </div>
        </div>

        <div className="bg-glass-200 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Consulting Form */}
          {activeTab === 'consulting' && (
            <form className="space-y-8">
              <div className="border-l-2 border-indigo-400 pl-4 mb-8">
                <p className="text-gray-300 text-sm italic">
                  「どんな写真を撮りたいか」を教えてください。
                  <br />
                  あなたの感性を言語化し、それを実現する機材を私が選定します。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-300">Target Subject (被写体)</label>
                  <input
                    type="text"
                    placeholder="e.g. 夜のストリートスナップ、子供のポートレート"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-300">Desired Mood (画の雰囲気)</label>
                  <input
                    type="text"
                    placeholder="e.g. 映画のような、コントラスト強め、ノスタルジック"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-300">Current Gear (現在の機材)</label>
                <textarea
                  rows={2}
                  placeholder="現在お使いのカメラやレンズがあれば教えてください（iPhoneのみでも可）。"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-300">Budget Range (予算感)</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer">
                    <option className="bg-[#1a1a1a]">〜 ¥100,000</option>
                    <option className="bg-[#1a1a1a]">〜 ¥200,000</option>
                    <option className="bg-[#1a1a1a]">〜 ¥400,000</option>
                    <option className="bg-[#1a1a1a]">¥500,000 +</option>
                    <option className="bg-[#1a1a1a]">未定 (提案を見て決定)</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-300">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-indigo-600 text-white font-bold tracking-widest rounded-lg hover:bg-indigo-500 transition-all transform hover:scale-[1.01] shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              >
                REQUEST PROPOSAL
              </button>
            </form>
          )}

          {/* Order Form */}
          {activeTab === 'order' && (
            <form className="space-y-8">
              <div className="border-l-2 border-white/50 pl-4 mb-8">
                <p className="text-gray-300 text-sm italic">
                  お探しの機材が決まっている方はこちら。
                  <br />
                  市場に出回らない良個体や、希少なオールドレンズを独自のルートで探します。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Manufacturer</label>
                  <input
                    type="text"
                    placeholder="e.g. Sony, Zeiss, Leica"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Model Name</label>
                  <input
                    type="text"
                    placeholder="e.g. α7IV, Summicron 50mm"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Desired Condition (希望状態)</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer">
                  <option className="bg-[#1a1a1a]">Mint Only (新品同様のみ)</option>
                  <option className="bg-[#1a1a1a]">Excellent (美品・光学系クリア)</option>
                  <option className="bg-[#1a1a1a]">User (実用品・外観スレOK)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Max Budget (上限予算)</label>
                  <input
                    type="text"
                    placeholder="¥"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-white text-black font-bold tracking-widest rounded-lg hover:bg-gray-200 transition-all transform hover:scale-[1.01]"
              >
                START SOURCING
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8 leading-relaxed">
          ※ 提案・お見積もりは無料です。成約時にのみ代金が発生します。
          <br />※ ご提案まで通常3営業日ほどお時間をいただきます。
        </p>
      </div>
    </section>
  );
}
