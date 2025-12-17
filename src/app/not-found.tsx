import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Not Found</h2>
                <p className="text-gray-400 mb-8">Could not find requested resource</p>
                <Link
                    href="/"
                    className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
