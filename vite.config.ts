import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8' // or 'v8'
    },
  },
  plugins: [react()],
})
