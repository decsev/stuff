import modelExtend from 'dva-model-extend';
import {modalModel} from '../common';
import {gridData, gridFromData, stockFromData, interestFormData, myInterestFormData, myInterestList} from './config';
import {deepClone, queryArray, config, queryURL} from 'utils';
import * as kitServices from 'services/kit';
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';

const {isProd} = config;
const namespace = 'kit';

export default {

  namespace: 'kit',

  state: {
    gridData,
    gridFromData,
    stockFromData,
    interestFormData,
    myInterestFormData,
    myInterestList,
    current_buyChange: 2,
    current_sellChange: 2,
    current_capital: 100000,
    current_type: '1',
    current_firstPrice: 30,
    current_firstAmount: 400,
    current_firstAddAmount: 400,
    current_realPrice: 29.39,
    current_showType: 2,
    current_isAuto: true,
    current_span: 5,
    current_upRatio: 2,
    current_downRatio: 2,
    current_myGridName: '惠风和畅',

    // 计算利息
    current_interesetType: '1',
    current_interestCapital: 100000,
    current_interesetRate: 5,
    current_interesetPeriod: 5,
    // 借贷
    current_myInterestShowType: 1,
    current_myInterestOrigin: 1
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {

      })
    }
  },

  effects: {
    *onInputChange({payload}, {call, put}) {
      if (payload.value === undefined) {return;}
      yield put({
        type: 'updateState',
        payload
      })
    },
    *hq({payload}, {call, put}) {
      const data = yield call(kitServices.hq, payload);
      if (data.success && data.code === 0) {
        return data.payload.data;
      }
      throw data;
    }

  },

  reducers: {
    updateState(state, {payload}) {
      state[`current_${payload.name}`] = payload.value;
      return {...state};
    }
  }

}
