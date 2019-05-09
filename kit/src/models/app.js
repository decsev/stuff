import modelExtend from 'dva-model-extend';
import {modalModel} from './common';
import queryString from 'query-string';
import * as services from 'services/app';
import {deepClone} from 'utils';
import {nav, loginModalFormData} from './config';

const namespace = 'app';
export default modelExtend(modalModel(namespace, services), {
  namespace: 'app',
  state: {
    isWidescreen: document.body.clientWidth > 769,
    locationPathname: '',
    locationQuery: {},
    nav: deepClone(nav),
    loginModalFormData: deepClone(loginModalFormData),
    logined: true
  },
  subscriptions: {
    setupHistory({dispatch, history}) {
      dispatch({
        type: 'updateState',
        payload: {
          locationPathname: '',
          locationQuery: {}
        }
      })
      // 初始化登陆弹窗
      dispatch({
        type: 'initModalState',
        payload: {
          modalId: 'loginModal'
        }
      })
      history.listen((location) => {
        setTimeout(() => {
          dispatch({
            type: 'updateState',
            payload: {
              locationPathname: location.pathname,
              locationQuery: queryString.parse(location.search)
            }
          })
        }, 300);

      })
    },
    setup({dispatch, history}) {
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({type: 'changeIsWideScreen'})
        }, 300)
      }
    }
  },
  effects: {
    *changeIsWideScreen({payload}, {call, put, select}) {
      const {app} = yield select(state => state)
      const isWidescreen = document.body.clientWidth > 769
      if (isWidescreen !== app.isNavbar) {
        yield put({
          type: 'updateState', payload: {
            isWidescreen
          }
        })
      }
    }
  },
  reducers: {
  }
})