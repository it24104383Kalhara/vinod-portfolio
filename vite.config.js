import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main:       resolve(__dirname, 'index.html'),
        projects:   resolve(__dirname, 'projects.html'),
        about:      resolve(__dirname, 'about.html'),
        contact:    resolve(__dirname, 'contact.html'),
      },
    },
    outDir: 'dist',
  },
})
