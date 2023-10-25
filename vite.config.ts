import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		setupFiles: './test/test-setup.ts',
		coverage: {
			reporter: ['text', 'json-summary', 'json', 'lcov'],
			provider: 'istanbul', // or v8
			exclude: [
				'./test/**',
				'**/node_modules/**',
				'**/dist/**',
				'**/cypress/**',
				'**/.{idea,git,cache,output,temp}/**',
				'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
			],
		},
		environment: 'jsdom',
		globals: true,
		css: true,
	},
	plugins: [react()],
});
