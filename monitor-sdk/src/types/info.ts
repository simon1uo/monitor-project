// 用户代理信息
export interface userAgent {
  browserName: string
  browserVersion: string
  osName: string
  osVersion: string
  deviceType: string
  deviceVendor: string
  deviceModel: string
  engineName: string
  engineVersion: string
  cpuArchitecture: string
  ua: string
}

// 网页以及浏览器信息
export interface PageInformation {
  host: string
  hostname: string
  href: string
  protocol: string
  origin: string
  port: string
  pathname: string
  search: string
  hash: string
  // 网页标题
  title: string
  // 浏览器的语种 (eg:zh) ; 这里截取前两位，有需要也可以不截取
  language: string
  // 用户 userAgent 信息
  userAgent: userAgent
  // 屏幕宽高 (eg:1920x1080)  屏幕宽高意为整个显示屏的宽高
  winScreen: string
  // 文档宽高 (eg:1388x937)   文档宽高意为当前页面显示的实际宽高（有的同学喜欢半屏显示）
  docScreen: string
}

// 上报的路由信息
export interface routeType {
  beforeUrl: string // 用户来路地址
  currentUrl: string // 路由跳转地址
  type: string // 用户来路方式
  startTime: number
  duration: number
  endTime: number
}
