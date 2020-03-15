export const state = {
  links: {
    'link-1': { id: 'link-1', link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background/', showPics: true },
    'link-2': { id: 'link-2', link: 'https://soundcloud.com/ritmomusic/ritmo-some-kind-of-rhythm-001', showPics: true },
    'link-3': { id: 'link-3', link: 'https://stackoverflow.com/questions/8825144/detect-double-tap-on-ipad-or-iphone-screen-using-javascript/', showPics: true },
    'link-4': { id: 'link-4', link: 'https://www.robinwieruch.de/react-hooks-fetch-data/', showPics: true },
    'link-5': { id: 'link-5', link: 'https://habr.com/ru/post/326986/', showPics: true },
    'link-6': { id: 'link-6', link: 'https://www.npmjs.com/package/react-native-link-preview/', showPics: true },
    'link-7': { id: 'link-7', link: 'https://habr.com/ru/company/ruvds/blog/423483/', showPics: true },
    'link-8': { id: 'link-8', link: 'https://medium.com/@misterdev/how-to-write-a-webpack-scaffold-ace202775572/', showPics: true },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Mailing link',
      linksIds: ['link-1', 'link-2', 'link-3', 'link-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'About JavaScript',
      linksIds: ['link-5', 'link-6'],
    },
    'column-3': {
      id: 'column-3',
      title: 'some libs',
      linksIds: ['link-7', 'link-8'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}
