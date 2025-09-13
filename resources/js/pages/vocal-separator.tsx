import React, { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    processing?: boolean;
    result?: {
        original_name: string;
        vocals_url: string;
        instrumental_url: string;
    };
    success?: string;
    error?: string;
    [key: string]: unknown;
}

export default function VocalSeparator({ processing = false, result, success, error }: Props) {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const { data, setData, post, errors, reset } = useForm({
        audio_file: null as File | null,
    });

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (isValidAudioFile(file)) {
                setData('audio_file', file);
                setFileName(file.name);
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (isValidAudioFile(file)) {
                setData('audio_file', file);
                setFileName(file.name);
            }
        }
    };

    const isValidAudioFile = (file: File) => {
        const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/flac'];
        return validTypes.includes(file.type) || /\.(mp3|wav|m4a|flac)$/i.test(file.name);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.audio_file) {
            post('/vocal-separator', {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    // Keep the form data to show file name
                },
            });
        }
    };

    const handleReset = () => {
        reset();
        setFileName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <Head title="🎵 AI Vocal Separator" />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            🎵 AI Vocal Separator
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Pisahkan vokal dan instrumental dari file audio Anda menggunakan AI canggih. 
                            Unggah file audio dan dapatkan dua track terpisah dalam hitungan detik!
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {!result ? (
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                {/* Upload Area */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div
                                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                                            dragActive
                                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                                : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
                                        }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <div className="space-y-4">
                                            <div className="text-6xl">🎧</div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    Unggah File Audio
                                                </h3>
                                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                                    Drag & drop file audio di sini atau klik tombol di bawah
                                                </p>
                                                <Button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
                                                >
                                                    📁 Pilih File
                                                </Button>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept=".mp3,.wav,.m4a,.flac"
                                                    onChange={handleFileSelect}
                                                    className="hidden"
                                                />
                                            </div>
                                            {fileName && (
                                                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                    <p className="text-green-700 dark:text-green-300 font-medium">
                                                        ✅ File dipilih: {fileName}
                                                    </p>
                                                </div>
                                            )}
                                            <p className="text-sm text-gray-400">
                                                Format yang didukung: MP3, WAV, M4A, FLAC (maksimal 50MB)
                                            </p>
                                        </div>
                                    </div>

                                    {errors.audio_file && (
                                        <div className="text-red-600 dark:text-red-400 text-sm">
                                            {errors.audio_file}
                                        </div>
                                    )}

                                    {error && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                            <p className="text-red-700 dark:text-red-300">❌ {error}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-4 justify-center">
                                        <Button
                                            type="submit"
                                            disabled={!data.audio_file || processing}
                                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium"
                                        >
                                            {processing ? (
                                                <>🔄 Memproses...</>
                                            ) : (
                                                <>🚀 Pisahkan Audio</>
                                            )}
                                        </Button>
                                        {fileName && (
                                            <Button
                                                type="button"
                                                onClick={handleReset}
                                                variant="outline"
                                                className="px-6 py-3"
                                            >
                                                🗑️ Reset
                                            </Button>
                                        )}
                                    </div>
                                </form>

                                {/* Features Section */}
                                <div className="mt-12 grid md:grid-cols-3 gap-6">
                                    <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                        <div className="text-3xl mb-3">🎤</div>
                                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                                            Ekstraksi Vokal
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            Pisahkan vokal dengan presisi tinggi menggunakan AI terdepan
                                        </p>
                                    </div>
                                    <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                        <div className="text-3xl mb-3">🎹</div>
                                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                                            Instrumental Murni
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            Dapatkan track instrumental berkualitas tinggi untuk karaoke
                                        </p>
                                    </div>
                                    <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                        <div className="text-3xl mb-3">⚡</div>
                                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                                            Proses Cepat
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            Pemrosesan dalam hitungan detik dengan kualitas studio
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Results Section */
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                <div className="text-center mb-8">
                                    <div className="text-6xl mb-4">🎉</div>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                        Pemrosesan Selesai!
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        File audio "{result.original_name}" telah berhasil dipisahkan
                                    </p>
                                    {success && (
                                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <p className="text-green-700 dark:text-green-300">✅ {success}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    {/* Vocals Download */}
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 text-center">
                                        <div className="text-4xl mb-4">🎤</div>
                                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">
                                            Track Vokal
                                        </h3>
                                        <p className="text-purple-600 dark:text-purple-400 text-sm mb-4">
                                            File audio yang berisi hanya vokal dari lagu
                                        </p>
                                        <a
                                            href={result.vocals_url}
                                            download={`${result.original_name}_vocals.wav`}
                                            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            ⬇️ Unduh Vokal
                                        </a>
                                    </div>

                                    {/* Instrumental Download */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
                                        <div className="text-4xl mb-4">🎹</div>
                                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">
                                            Track Instrumental
                                        </h3>
                                        <p className="text-blue-600 dark:text-blue-400 text-sm mb-4">
                                            File audio tanpa vokal, cocok untuk karaoke
                                        </p>
                                        <a
                                            href={result.instrumental_url}
                                            download={`${result.original_name}_instrumental.wav`}
                                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            ⬇️ Unduh Instrumental
                                        </a>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Button
                                        type="button"
                                        onClick={handleReset}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                                    >
                                        🔄 Proses File Lain
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}