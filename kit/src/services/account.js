import {request, config} from 'utils'

const {api, isProd} = config;
const {Strategy, custom} = api;
const localStorageRegnumber = localStorage.getItem('_n') || (isProd ? undefined : 724744);
const localStorageToken = localStorage.getItem('_t') || (isProd ? undefined : '914ea728b81675221862ca12eb78118c');


export async function queryAll(params) {
  return request({
    url: `${Strategy}/accountDetail`,
    method: 'post',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

export async function tradingAccountList(params) {
  return request({
    url: `${custom}/tradingAccountList`,
    method: 'get',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}