<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VocalSeparatorController extends Controller
{
    /**
     * Display the vocal separator interface.
     */
    public function index()
    {
        return Inertia::render('vocal-separator');
    }

    /**
     * Process uploaded audio file for vocal separation.
     */
    public function store(Request $request)
    {
        $request->validate([
            'audio_file' => 'required|file|mimes:mp3,wav,m4a,flac|max:51200', // 50MB max
        ]);

        try {
            $file = $request->file('audio_file');
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            
            // Store the uploaded file
            $uploadedPath = $file->store('uploads', 'public');
            
            // Ensure processed directory exists
            Storage::disk('public')->makeDirectory('processed');
            
            // Simulate processing (in real implementation, this would call AI service)
            sleep(2); // Simulate processing time
            
            // Generate mock processed files
            $vocalsPath = 'processed/' . $originalName . '_vocals.wav';
            $instrumentalPath = 'processed/' . $originalName . '_instrumental.wav';
            
            // In real implementation, these would be the actual separated audio files
            // For demo, we'll copy the original file as placeholders
            Storage::disk('public')->copy($uploadedPath, $vocalsPath);
            Storage::disk('public')->copy($uploadedPath, $instrumentalPath);
            
            return Inertia::render('vocal-separator', [
                'processing' => false,
                'result' => [
                    'original_name' => $originalName,
                    'vocals_url' => Storage::url($vocalsPath),
                    'instrumental_url' => Storage::url($instrumentalPath),
                ],
                'success' => 'Audio berhasil diproses! File vokal dan instrumental siap diunduh.'
            ]);
            
        } catch (\Exception $e) {
            return Inertia::render('vocal-separator', [
                'processing' => false,
                'error' => 'Terjadi kesalahan saat memproses file audio. Silakan coba lagi.'
            ]);
        }
    }
}