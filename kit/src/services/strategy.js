import {request, config} from 'utils'

const {api, isProd} = config;
const {Strategy, custom} = api;
const localStorageRegnumber = localStorage.getItem('_n') || (isProd ? undefined : 724744);
const localStorageToken = localStorage.getItem('_t') || (isProd ? undefined : '914ea728b81675221862ca12eb78118c');

export async function strategyList(params) {
  return request({
    url: `${Strategy}/strategyListEx`,
    method: 'get',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

export async function remove(params) {
  return request({
    url: `${Strategy}/remove`,
    method: 'post',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

export async function start(params) {
  return request({
    url: `${Strategy}/start`,
    method: 'post',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

export async function stop(params) {
  return request({
    url: `${Strategy}/stop`,
    method: 'post',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

export async function stopAll(params) {
  return request({
    url: `${Strategy}/stopAll`,
    method: 'post',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}


/**
 * 获取交易所帐户信息
 * params { exchange }
 * header { Regnumber, Token }
 * @export
 * @param {*} params
 * @returns
 */
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


/**
 * 新增策略
 * header { Regnumber, Token }
 * @export
 * @param {*} params
 * @returns
 */
export async function strategyAdd(params) {
  return request({
    url: `${Strategy}/add`,
    method: 'POST',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

/**
 * 获取交易所帐户信息
 * params { exchange }
 * header { Regnumber, Token }
 * @export
 * @param {*} params
 * @returns
 */
export async function getStrategy(params) {
  return request({
    url: `${Strategy}/getStrategy`,
    method: 'get',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

export async function edit(params) {
  return request({
    url: `${Strategy}/edit`,
    method: 'post',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

export async function queryAll(params) {
  let url = '';
  const {tableId, ...payload} = params;
  switch (tableId) {
    case 'table0':
      url = 'strategyDayCloseProfit';
      break;
    case 'table1':
      url = 'spreadOpenInfo'
      break;
    case 'table2':
      url = 'orderList';
      payload.statusList = [];
      break;
    default:
      break;
  }
  return request({
    url: `${Strategy}/${url}`,
    method: 'post',
    data: payload,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

/**
 * 获取交易所帐户信息
 * params { exchange }
 * header { Regnumber, Token }
 * @export
 * @param {*} params
 * @returns
 */
export async function close(params) {
  return request({
    url: `${Strategy}/closeSpreadOpenInfo`,
    method: 'post',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

/**
 * 策略明细信息
 * params { exchange }
 * header { Regnumber, Token }
 * @export
 * @param {*} params
 * @returns
 */
export async function strategyDetail(params) {
  return request({
    url: `${Strategy}/strategyDetail`,
    method: 'get',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

export async function spreadSymbol(params) {
  return request({
    url: `${Strategy}/spreadSymbol`,
    method: 'post',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}
// balanceAndOpenVolInfo
export async function balanceList(params) {
  return request({
    url: `${Strategy}/balanceAndOpenVolInfo`,
    method: 'post',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}

/**
 * 16 策略账户每日资产接口(strategyDailyBalance)
 * params { exchange }
 * header { Regnumber, Token }
 * @export
 * @param {*} params
 * @returns
 */
export async function strategyDailyBalance(params) {
  return request({
    url: `${Strategy}/strategyDailyBalance`,
    method: 'post',
    data: params,
    headers: {
      Regnumber: localStorageRegnumber,
      Token: localStorageToken
    }
  })
}