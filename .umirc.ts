import { defineConfig } from 'umi';

export default defineConfig({
  title: 'SJTU选课社区',
  favicon: './react.svg',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      exact: true,
      path: '/login',
      component: '@/pages/login',
      title: '登录 - SJTU选课社区',
    },
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          exact: true,
          path: '/',
          redirect: '/latest',
          title: '最新点评 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/statistic',
          component: '@/pages/statistic',
          title: '统计信息 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/activity',
          component: '@/pages/activity',
          title: '我的点评 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/about',
          component: '@/pages/about',
          title: '关于 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/latest',
          component: '@/pages/latest',
          title: '最新点评 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/courses',
          component: '@/pages/courses',
          title: '课程库 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/course/:id',
          component: '@/pages/course',
        },
        {
          exact: true,
          path: '/course/:course_id/review',
          component: '@/pages/review',
          title: '写点评 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/review/:review_id?',
          component: '@/pages/review',
          title: '写点评 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/search',
          component: '@/pages/search',
        },
        {
          exact: true,
          path: '/report',
          component: '@/pages/report',
          title: '反馈 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/faq',
          component: '@/pages/faq',
          title: '常见问题 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/sync',
          component: '@/pages/sync',
          title: '同步课表 - SJTU选课社区',
        },
        {
          exact: true,
          path: '/point',
          component: '@/pages/point',
          title: '社区积分 - SJTU选课社区',
        },
        { component: '@/pages/404', title: '404 - SJTU选课社区' },
      ],
    },
  ],
  fastRefresh: {},
  theme: {
    '@primary-color': '#1DA57A',
  },
  hash: true,
  mock: false,
  analytics: {
    baidu: 'bffe2d130d940fce5a0876ee2dc36b92',
  },
  metas: [
    { name: 'author', content: 'SJTUers' },
    { name: 'keywords', content: 'SJTU, 上海交通大学, 选课, 评课' },
    { name: 'description', content: 'SJTU选课社区，本科课程体验评价' },
  ],
});
