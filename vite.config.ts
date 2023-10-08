import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    setupFiles: './src/test/test-setup.ts',
    coverage: {
      reporter: ['text', 'json-summary', 'json', 'lcov'],
      provider: 'v8' // or istanbul
    },
    environment: 'jsdom',
    globals: true,
    css: true,
  },
  plugins: [react()],
})
