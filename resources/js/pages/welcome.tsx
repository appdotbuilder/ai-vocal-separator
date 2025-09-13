import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="🎵 AI Vocal Separator - Pisahkan Vokal dan Instrumental">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-purple-50 to-blue-50 p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-purple-200 px-5 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-5 py-2 text-sm font-medium text-gray-700 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-gray-800/50"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2 text-sm font-medium text-white hover:from-purple-700 hover:to-blue-700 shadow-lg"
                                >
                                    Daftar Gratis
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-6xl flex-col items-center">
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="text-8xl mb-6">🎵</div>
                            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent lg:text-6xl">
                                AI Vocal Separator
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
                                Pisahkan vokal dan instrumental dari file audio Anda menggunakan teknologi AI terdepan. 
                                Proses cepat, kualitas studio, hasil profesional!
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <Link
                                    href="/vocal-separator"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                    🚀 Mulai Pisahkan Audio
                                </Link>
                                {!auth.user && (
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center gap-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-gray-900"
                                    >
                                        👤 Daftar Gratis
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16 w-full max-w-5xl">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                                <div className="text-5xl mb-4">🎤</div>
                                <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">
                                    Ekstraksi Vokal Presisi
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    AI canggih memisahkan vokal dengan akurasi tinggi, 
                                    mempertahankan kualitas suara asli tanpa distorsi
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                                <div className="text-5xl mb-4">🎹</div>
                                <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">
                                    Instrumental Berkualitas
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Dapatkan track instrumental murni yang perfect untuk 
                                    karaoke, remix, atau backing track professional
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                                <div className="text-5xl mb-4">⚡</div>
                                <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">
                                    Proses Super Cepat
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Pemrosesan dalam hitungan detik! Upload file audio 
                                    dan dapatkan hasil terpisah dengan kualitas studio
                                </p>
                            </div>
                        </div>

                        {/* How It Works */}
                        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-16">
                            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                                🔧 Cara Kerja
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                                        📁
                                    </div>
                                    <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">
                                        1. Upload File
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Drag & drop atau pilih file audio (MP3, WAV, M4A, FLAC)
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                                        🤖
                                    </div>
                                    <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                        2. AI Processing
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Algoritma AI canggih memisahkan vokal dan instrumental
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                                        ⬇️
                                    </div>
                                    <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">
                                        3. Download Results
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Dapatkan 2 file terpisah: vocal track dan instrumental
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Supported Formats */}
                        <div className="w-full max-w-3xl text-center">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                📋 Format Audio yang Didukung
                            </h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg font-medium">
                                    🎵 MP3
                                </span>
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg font-medium">
                                    🎶 WAV
                                </span>
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg font-medium">
                                    🎧 M4A
                                </span>
                                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-lg font-medium">
                                    🔊 FLAC
                                </span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
                                Maksimal ukuran file: 50MB per upload
                            </p>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-16 text-center">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                                <h2 className="text-2xl font-bold mb-4">
                                    🎉 Siap Memisahkan Audio Anda?
                                </h2>
                                <p className="mb-6 opacity-90">
                                    Mulai sekarang dan dapatkan hasil berkualitas profesional dalam hitungan detik!
                                </p>
                                <Link
                                    href="/vocal-separator"
                                    className="inline-flex items-center gap-3 bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                    🚀 Mulai Sekarang - Gratis!
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}