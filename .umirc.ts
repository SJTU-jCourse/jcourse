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
        { exact: true, path: '/', redirect: '/latest' },
        { exact: true, path: '/statistic', component: '@/pages/statistic' },
        { exact: true, path: '/activity', component: '@/pages/activity' },
        { exact: true, path: '/about', component: '@/pages/about' },
        { exact: true, path: '/latest', component: '@/pages/latest' },
        { exact: true, path: '/courses', component: '@/pages/courses' },
        { exact: true, path: '/course/:id', component: '@/pages/course' },
        { exact: true, path: '/review', component: '@/pages/review' },
        { exact: true, path: '/search', component: '@/pages/search' },
        { exact: true, path: '/report', component: '@/pages/report' },
        { exact: true, path: '/faq', component: '@/pages/faq' },
        { exact: true, path: '/sync', component: '@/pages/sync' },
        { component: '@/pages/404' },
      ],
    },
  ],
  fastRefresh: {},
  theme: {
    '@primary-color': '#1DA57A',
  },
  hash: true,
  mock: false,

  headScripts: [
    {
      content: `var _hmt = _hmt || [];
  (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?bffe2d130d940fce5a0876ee2dc36b92";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
  })();
  _hmt.push(['_requirePlugin', 'UrlChangeTracker', {
      shouldTrackUrlChange: function (newPath, oldPath) {
          return newPath && oldPath;
      }
  }
  ]);`,
    },
  ],
});
