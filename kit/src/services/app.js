import {request, config} from 'utils'

const {api, isProd} = config;
const {api1} = api;


export async function auth(params) {
  return request({
    url: `${api1}/auth`,
    method: 'post',
    data: params
  })
}