import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Plugin to directly serve editable root video files (video1.mp4, video2.mp4, video3.mp4)
function serveRootVideosPlugin() {
  return {
    name: 'serve-root-videos',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url.match(/^\/(?:videos\/)?(video[123]\.mp4)(?:\?.*)?$/);
        if (match) {
          const fileName = match[1];
          const rootVideoPath = path.resolve(process.cwd(), fileName);
          if (fs.existsSync(rootVideoPath)) {
            const stat = fs.statSync(rootVideoPath);
            const range = req.headers.range;
            res.setHeader('Content-Type', 'video/mp4');
            res.setHeader('Accept-Ranges', 'bytes');
            
            if (range) {
              const parts = range.replace(/bytes=/, '').split('-');
              const start = parseInt(parts[0], 10);
              const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
              const chunksize = end - start + 1;
              const fileStream = fs.createReadStream(rootVideoPath, { start, end });
              res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${stat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4'
              });
              return fileStream.pipe(res);
            } else {
              res.writeHead(200, {
                'Content-Length': stat.size,
                'Content-Type': 'video/mp4'
              });
              return fs.createReadStream(rootVideoPath).pipe(res);
            }
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), serveRootVideosPlugin()],
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/dist/**', '**/node_modules/**']
    }
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Split vendor packages into separate cacheable chunks (no circular deps)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('react-dom')) return 'vendor-react-dom';
            if (id.includes('/react/')) return 'vendor-react';
            if (id.includes('@react-pdf') || id.includes('pdfmake') || id.includes('jspdf')) return 'vendor-pdf';
            if (id.includes('xlsx') || id.includes('exceljs')) return 'vendor-excel';
            return 'vendor-misc';
          }
        },
        // Deterministic file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = (assetInfo.name ?? '').split('.').pop() ?? '';
          if (/png|jpe?g|svg|gif|webp|ico|avif/.test(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/css/.test(ext)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Increase chunk size warning limit (CSS is large by design)
    chunkSizeWarningLimit: 600
  }
});

