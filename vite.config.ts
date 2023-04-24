import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { viteMockServe } from 'vite-plugin-mock';
import { svgsprites } from './vite_plugins/svgsprites';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [Unocss(), react(), viteMockServe(), svgsprites()],

  // 宿主机修改文件后，虚拟机中的 vite 无法检测到文件变化，需要手动刷新浏览器
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  // },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ['echarts'],
        },
      },
    },
  },
}));
