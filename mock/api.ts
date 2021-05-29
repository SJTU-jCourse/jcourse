export default {
  // 支持值为 Object 和 Array
  'GET /api/statistic': { courses: 1140, reviews: 5140 },

  // GET 可忽略
  'GET /api/filters': {
    categories: [
      { name: '通选', count: 11 },
      { name: '通识', count: 11 },
      { name: '英语', count: 11 },
      { name: '两课', count: 11 },
      { name: '体育', count: 11 },
    ],
    departments: [
      { name: '船舶海洋与建筑工程学院', count: 101 },
      { name: '电子信息与电气工程学院', count: 1551 },
    ],
  },

  'GET /api/courses': {
    count: 11,
    courses: [
      {
        id: 1,
        course_info: {
          code: 'MATH1111',
          category: '专业',
          department: '数学科学学院',
          name: '高等数学',
          credit: 6.0,
        },
        main_teacher: {
          tid: '11111',
          department: '机械与动力工程',
          name: '何铭',
          title: '教授',
        },
        language: '中文',
        rating: { avg: 5.0, count: 10 },
      },
      {
        id: 2,
        course_info: {
          code: 'CS2222H',
          category: '通识',
          department: '电子信息与电气工程学院',
          name: '程序设计思想与方法（C++）',
          credit: 6.0,
        },
        main_teacher: {
          tid: '11111',
          department: '机械与动力工程',
          name: '赵先超',
          title: '教授',
        },
        language: '中文',
        rating: { avg: 5.0, count: 10 },
      },
    ],
  },

  'GET /api/course/1': {
    id: 1,
    course_info: {
      code: 'MATH1111',
      category: '专业课',
      department: '数学科学学院',
      name: '高等数学',
      credit: 6.0,
    },
    main_teacher: {
      tid: '11111',
      department: '机械与动力工程',
      name: '何铭',
      title: '教授',
    },
    teacher_group: [
      {
        tid: '11111',
        department: '机械与动力工程',
        name: '何铭',
        title: '教授',
      },
    ],
    language: '中文',
    rating: { avg: 5.0, count: 10 },
    related_teachers: [{ id: 1, name: '王铭' }],
    related_courses: [{ id: 2, name: '线性代数' }],
  },

  'GET /api/course/1/reviews': {
    count: 10,
    reviews: [
      {
        id: 1,
        semester: '2020-2021-1',
        rating: 5,
        comment:
          '真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳',
        created: '2021-5-29',
        approves: 10,
        disapproves: 5,
        score: 'A+',
      },
    ],
  },

  'GET /api/semesters': ['2020-2021-1', '2020-2021-2', '2020-2021-3'],

  'GET /api/course-lite': [
    { code: 'MATH2222', name: '高等数学' },
    { code: 'CS2222', name: '数据结构' },
  ],

  'GET /api/search': {
    count: 11,
    courses: [
      {
        id: 1,
        course_info: {
          code: 'MATH1111',
          category: '专业',
          department: '数学科学学院',
          name: '高等数学',
          credit: 6.0,
        },
        main_teacher: {
          tid: '11111',
          department: '机械与动力工程',
          name: '何铭',
          title: '教授',
        },
        language: '中文',
        rating: { avg: 5.0, count: 10 },
      },
      {
        id: 2,
        course_info: {
          code: 'CS2222H',
          category: '通识',
          department: '电子信息与电气工程学院',
          name: '程序设计思想与方法（C++）',
          credit: 6.0,
        },
        main_teacher: {
          tid: '11111',
          department: '机械与动力工程',
          name: '赵先超',
          title: '教授',
        },
        language: '中文',
        rating: { avg: 5.0, count: 10 },
      },
    ],
  },

  'GET /api/reviews': {
    count: 10,
    reviews: [
      {
        id: 1,
        course: {
          id: 1,
          code: 'MATH1111',
          name: '高等数学',
          teacher: '何铭',
        },
        semester: '2020-2021-1',
        rating: 5,
        comment:
          '真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳真不戳',
        created: '2021-5-29',
        approves: 10,
        disapproves: 5,
        score: 99,
      },
    ],
  },

  'POST /api/review': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({ msg: 'ok' }));
  },
  'POST /api/report': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({ msg: 'ok' }));
  },
};
