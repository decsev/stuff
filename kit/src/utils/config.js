let APIV1 = 'https://api.blockex.ai';
let APIV2 = 'https://api.blockex.ai';
let APIV3 = 'http://tp5.com';

if (phixSit === 'prod' || phixSit === 'dev') {
  let myhost = 'blockex.ai';
  const hostnameArr = location.hostname.split('.');
  if (hostnameArr.length >= 2) {
    myhost = hostnameArr[hostnameArr.length - 2] + '.' + hostnameArr[hostnameArr.length - 1]
  }
  APIV1 = 'https://api.' + myhost;
  APIV2 = 'https://api.' + myhost;
}

module.exports = {
  isProd: true, // 上线时设为true
  name: 'imbin',
  prefix: 'imbin',
  footerText: 'imbin',
  logo: '/logo.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [APIV1, APIV2, APIV3],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV3,
  api: {
    Strategy: `${APIV1}/api/Strategy`,
    custom: `${APIV2}/api/custom`,
    api1: `${APIV1}`
  }
}
