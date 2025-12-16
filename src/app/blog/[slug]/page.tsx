import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import BlogArticleScripts from '@/components/BlogArticleScripts';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">記事が見つかりません</h1>
          <p className="text-gray-400 mb-8">
            お探しの記事は存在しないか、削除された可能性があります。
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-white text-black text-sm font-bold tracking-widest rounded-full hover:bg-gray-200 transition-colors"
          >
            ブログ一覧へ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-smooth">
      <BlogArticleScripts />

      {/* Progress Bar */}
      <div id="progress-bar"></div>

      {/* Background Effects */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob"></div>
        <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="bg-noise"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-40 top-0 p-6 transition-all duration-300" id="navbar">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-glass-200 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
          <Link href="/" className="text-xl font-bold tracking-widest text-white">
            SATORI
          </Link>
          <div className="flex items-center space-x-6 text-xs tracking-widest uppercase text-gray-400">
            <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Journal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-20 fade-up-element">
          {post.tags.length > 0 && (
            <div className="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">{post.tags[0]}</span>
            </div>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-8">
            {post.title}
          </h1>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-300 font-light tracking-wide">
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>By {post.author}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>5 min read</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-6 pb-24 pt-[30px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Sidebar - Share */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-8 fade-up-element delay-100">
              <div>
                <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Share</h4>
                <div className="flex flex-col space-y-3">
                  <button className="w-10 h-10 rounded-full bg-glass-200 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-glass-200 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article */}
          <article className="col-span-1 lg:col-span-6 article-content fade-up-element delay-200">
            {post.excerpt && (
              <p className="drop-cap text-lg md:text-xl text-gray-200 font-serif leading-loose mb-10">
                {post.excerpt}
              </p>
            )}

            <div dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-16 pt-8 border-t border-white/10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                ブログ一覧へ戻る
              </Link>
            </div>
          </article>

          {/* Right Sidebar - Related Stories */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 fade-up-element delay-300">
              <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6 border-b border-white/10 pb-2">
                Related Stories
              </h4>

              <div className="space-y-6">
                <a href="#" className="block group">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3 border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <img
                      src="https://images.unsplash.com/photo-1590502593747-42a996133562?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Related"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors leading-snug">
                    The Sharpness of Zeiss: Looking into the Soul
                  </h5>
                </a>

                <a href="#" className="block group">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3 border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <img
                      src="https://images.unsplash.com/photo-1510849529004-730351a05b54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Related"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors leading-snug">
                    Film vs Digital: Why we still choose grain
                  </h5>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] py-10 px-6 text-center border-t border-white/10">
        <Link href="/" className="text-xl font-bold tracking-widest text-white mb-4 block">
          SATORI
        </Link>
        <p className="text-gray-600 text-xs tracking-wide">&copy; 2024 SATORI CAMERA. All rights reserved.</p>
      </footer>
    </div>
  );
}

// 静的生成のためのパス生成
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
