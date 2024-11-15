import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import qiankun from 'vite-plugin-qiankun'
import reactRefresh from '@vitejs/plugin-react-refresh'
// useDevMode 开启时与热更新插件冲突
const useDevMode = true;
// https://vitejs.dev/config/
export default ({ mode }) => {
  const __DEV__ = mode === 'development'
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      ...(useDevMode ? []:[reactRefresh()]),
      qiankun('appVite', { useDevMode  }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      port: 40002,
      host: '0.0.0.0',
      // 设置源是因为图片资源会找错位置所以通过这个让图片等资源不会找错
      origin: '//localhost:40002',
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    base: __DEV__ ? '/' : '//localhost:40002',
  })
}