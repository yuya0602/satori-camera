import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import AnimationScripts from '@/components/AnimationScripts';

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="scroll-smooth">
      <AnimationScripts />

      {/* Background Effects */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-900 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-900 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
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
            <Link href="/philosophy" className="hover:text-white transition-colors">
              Philosophy
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
      <header className="pt-40 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-end border-b border-white/10 pb-12 fade-up-element">
          <div>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-blue-300 mb-4 font-bold">The Journal</p>
            <h1 className="text-5xl md:text-7xl font-serif font-light leading-none">
              Visual<br />
              <span className="text-gray-500 italic font-sans">Stories</span>
            </h1>
          </div>

          <div className="hidden md:block absolute right-10 top-40 opacity-50">
            <div className="flex gap-4 text-xs tracking-widest text-gray-400 font-serif border-r border-white/10 pr-6 h-40" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.3em' }}>
              <span>光の記録と記憶</span>
              <span>レンズ越しの世界</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 overflow-x-auto pb-4 scrollbar-hide fade-up-element delay-100">
          <div className="flex space-x-6 text-sm tracking-widest uppercase text-gray-500 whitespace-nowrap">
            <a href="#" className="text-white border-b border-white pb-1">
              All Stories
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Lens Reviews
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Photo Essays
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Interviews
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Maintenance
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post */}
          {featuredPost && (
            <section className="mb-24 fade-up-element delay-200">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group relative block w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl"
              >
                {featuredPost.coverImage && (
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>

                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                  {featuredPost.tags.length > 0 && (
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold tracking-wider uppercase mb-4 border border-white/20">
                      Editor&apos;s Pick
                    </span>
                  )}
                  <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4 leading-tight group-hover:underline decoration-1 underline-offset-8 decoration-white/30">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-300 font-light mb-6 line-clamp-2 md:line-clamp-none">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-xs tracking-widest text-gray-400 uppercase">
                    <span>{featuredPost.date}</span>
                    <span className="mx-3">•</span>
                    <span>{featuredPost.tags[0]}</span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {regularPosts.map((post, index) => {
              const delayClass = `delay-${Math.min((index % 3) + 1, 4) * 100}`;

              return (
                <article key={post.slug} className={`group fade-up-element ${delayClass} cursor-pointer`}>
                  <Link href={`/blog/${post.slug}`}>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-glass-100 border border-white/5 relative">
                      {post.coverImage && (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                      )}
                      {post.tags.length > 0 && (
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                          {post.tags[0]}
                        </div>
                      )}
                    </div>
                    <div className="pr-4">
                      <div className="text-xs text-gray-500 mb-2 font-mono">{post.date.toUpperCase()}</div>
                      <h3 className="text-xl font-serif font-medium leading-snug mb-3 group-hover:text-blue-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-400 font-light line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-24 text-center fade-up-element">
            <div className="inline-flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="w-2 h-2 rounded-full bg-white/20"></span>
              <span className="w-2 h-2 rounded-full bg-white/20"></span>
            </div>
            <div className="mt-8">
              <button className="px-10 py-4 border border-white/20 rounded-full text-sm font-bold tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300">
                LOAD OLDER STORIES
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 z-0"></div>
        <div className="relative z-10 max-w-2xl mx-auto text-center fade-up-element">
          <h2 className="text-3xl font-serif mb-6">Join the Circle</h2>
          <p className="text-gray-400 mb-8 font-light">
            新着レンズの入荷情報や、写真に関するエッセイを<br />
            週に一度、静かな夜にお届けします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all placeholder-gray-500"
            />
            <button className="px-8 py-4 bg-white text-black rounded-full font-bold tracking-widest hover:bg-gray-200 transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-10 px-6 relative z-10 text-center">
        <div className="mb-4">
          <Link href="/" className="text-xl font-bold tracking-widest text-white">
            SATORI
          </Link>
        </div>
        <div className="flex justify-center space-x-6 text-xs text-gray-500 mb-6">
          <a href="#" className="hover:text-white transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
        <p className="text-gray-700 text-xs tracking-wide">&copy; 2024 SATORI CAMERA. All rights reserved.</p>
      </footer>
    </div>
  );
}
