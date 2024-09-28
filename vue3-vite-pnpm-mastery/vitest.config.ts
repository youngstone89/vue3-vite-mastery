import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

// https://blog.logrocket.com/guide-vitest-automated-testing-vue-components/#what-is-vitest
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: false, // allow Vitest APIs to be accessible within test files without import
      environment: 'jsdom', // or happy-dom
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: "v8"
      }
    }
  })
)
