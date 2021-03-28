const { Home, ResumeBuilder, FinalResume } = require('src/pages')

module.exports = [
  {
    name: 'Home',
    urlPath: '/',
    PageComponent: Home,
    isVisible: true,
  },
  {
    name: 'Resume Builder',
    urlPath: '/resume-builder',
    PageComponent: ResumeBuilder,
    isVisible: true,
  },
  {
    name: 'Your Resume',
    urlPath: '/build-resume',
    PageComponent: FinalResume,
    isVisible: false,
  },
]
