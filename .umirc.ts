import { defineConfig } from 'umi';

export default defineConfig({
  title: 'SJTU选课社区',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/login', component: '@/pages/login' },
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/index' },
        { exact: true, path: '/about', component: '@/pages/about' },
        { exact: true, path: '/latest', component: '@/pages/latest' },
        { exact: true, path: '/courses', component: '@/pages/courses' },
        { exact: true, path: '/course/:id', component: '@/pages/course' },
        { exact: true, path: '/review', component: '@/pages/review' },
        { exact: true, path: '/search', component: '@/pages/search' },
        { exact: true, path: '/report', component: '@/pages/report' },
        { exact: true, path: '/faq', component: '@/pages/faq' },
        { component: '@/pages/404' },
      ],
    },
  ],
  fastRefresh: {},
  theme: {
    '@primary-color': '#1DA57A',
  },
  mock: false,
  proxy: {
    '/api': {
      target: 'http://localhost:8000/',
      changeOrigin: true,
    },
    '/oauth': {
      target: 'http://localhost:8000/',
      changeOrigin: false,
    },
  },
});
