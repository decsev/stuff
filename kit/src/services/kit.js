import {request, config} from 'utils'
const {APIV3} = config;
export async function hq(params) {
  return request({
    url: `${APIV3}/hq/${params.code}`,
    method: 'get'
  })
}
