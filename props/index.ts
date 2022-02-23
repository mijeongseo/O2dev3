export type MapStyleProps = 'dark' | 'light';

export const LAYOUT_PROPS = {
  h_height: '40px',
  s_width: '365px'
}

export const HEADER_MENU: Array<string[]> = [
  ['MAP', '/'],
  // ['DASHBOARD', '/dashboard', 'disabled'],
  // ['BLOG', '/blog', 'disabled'],
];

export const SERVICE_MENU: {[index: string]: string[]} = {
  square : ['사각형 그리기', '면적'],
  hexagon : ['다각형 그리기', '면적'],
  line : ['선 그리기', '길이'],
  point : ['점 그리기',],
}

export const SIDEBAR_HEADER_MENU = [
  // ['NEWS', 'icon/sidebar/news.svg', 'disabled'],
  ['FINDER', 'icon/sidebar/finder.svg', ''],
  ['MY PAGE', 'icon/sidebar/mypage.svg', '']
];