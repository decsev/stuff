import modelExtend from 'dva-model-extend';
import {getTableModel} from '../common';
import {deepClone, queryArray, config} from 'utils';
import * as accountServices from 'services/account';
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';

const {isProd} = config;
const namespace = 'account';
let urlParamsStrategyId = undefined;
const localStorageUserId = localStorage.getItem('_n') || (isProd ? undefined : 724744);
const tagsMap = new Map([
  ['仅显示未完成', 'onlyNotFinished']
]);
export default modelExtend(getTableModel(namespace, accountServices), {

  namespace: 'account',

  state: {
    futurePositionList: [],
    spotAccount: {},
    futureAccount: {},
    futureOrderList: [],
    spotOrderList: [],
    marginAccount: {}
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
      })
    }
  },

  effects: {
    *query({payload}, {call, put, select}) {
      const mydata = yield call(accountServices.queryAll, payload);
      if (mydata.code === 0 && mydata.success) {
        const data = mydata.payload.data;
        yield put({
          type: 'updateState',
          payload: {
            futurePositionList: data.futurePositionList || [],
            spotAccount: data.spotAccount || {},
            futureAccount: data.futureAccount || {},
            futureOrderList: data.futureOrderList || [],
            spotOrderList: data.spotOrderList || [],
            marginAccount: data.marginAccount || {}
          }
        })
      } else {
        throw mydata;
      }
    },
    *tradingAccountList({payload}, {call, put, select}) {
      const data = yield call(accountServices.tradingAccountList, payload);
      const dataArr = data.payload.data;
      let accountList = {};
      // 过滤没有帐号的交易所
      for (let key in dataArr) {
        if (dataArr[key].length > 0) {
          accountList[key] = dataArr[key];
        }
      }
      data.payload.data = accountList;
      return data;
    },
    *onInputChange({payload}, {call, put}) {

    }


  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    }
  }

})
