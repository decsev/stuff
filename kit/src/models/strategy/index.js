import modelExtend from 'dva-model-extend';
import {getTableModel} from '../common';
import {strategyListColumns, strategyFormData, JYSCAT, strategyFormData5, strategyListColumns5, strategyFormData6, strategyListColumns6} from './config';
import {deepClone, queryArray, config, queryURL} from 'utils';
import * as strategyServices from 'services/strategy';
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';

const {isProd} = config;
const namespace = 'strategy';
let urlParamsStrategyId = undefined;
const localStorageUserId = localStorage.getItem('_n') || (isProd ? undefined : 724744);

const filtersData = {
  selectedTags: ['仅显示未完成'],
  tags: ['仅显示未完成']
}
const tagsMap = new Map([
  ['仅显示未完成', 'onlyNotFinished']
]);
let strategyType = '1';
let strateForm = deepClone(strategyFormData);
let strategyListColumnsData = deepClone(strategyListColumns);
if (window.location.hash.match(/\?.*/)) {
  strategyType = queryURL('type', window.location.hash.match(/\?.*/)[0]) || '1';
}
if (strategyType === '5') {
  strateForm = deepClone(strategyFormData5);
  strategyListColumnsData = deepClone(strategyListColumns5);
}
if (strategyType === '6') {
  strateForm = deepClone(strategyFormData6);
  strategyListColumnsData = deepClone(strategyListColumns6);
}

export default modelExtend(getTableModel(namespace, strategyServices), {

  namespace: 'strategy',

  state: {
    strategyListColumns: strategyListColumnsData,
    strategyFormData: strateForm,
    list: [],
    selectedRowKeys: {
      table1: [],
      table2: []
    },
    QHJYS_userList: [],
    XHJYS_userList: [],
    isEdit: false,
    currentStrategyStatus: null,
    tagsData1: deepClone(filtersData),
    tagsData2: deepClone(filtersData),
    strategyDetail: {},
    currentStrategyName: '',
    isStopClose: null, // 停止平仓
    isStopOpen: null, // 停止开仓
    isCloseAll: null, // 1为正在平仓
    spreadSymbol: null, // k线跳转链接参数
    currentSymbol: null, // 5 当前品种
    currentAccount: null,
    currentExchange: null,
    myCurrentSymbol: null,
    openVolMax: 0 // 最大开仓量
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const ptr = pathToRegexp('/strategyDetail/:id').exec(location.pathname);
        if (ptr) {
          urlParamsStrategyId = Number(ptr[1]);
          dispatch({ // 策略明细信息
            type: 'strategyDetail',
            payload: {

            }
          })
          if (strategyType === '1') {
            dispatch({
              type: 'getStrategy',
              payload: {
                // entityId: urlParamsStrategyId,
                // userId: localStorageUserId
              }
            })
          }
          if (strategyType === '5') {
            dispatch({
              type: 'getStrategy5',
              payload: {
                // entityId: urlParamsStrategyId,
                // userId: localStorageUserId
              }
            })
          }
          if (strategyType === '6') {
            dispatch({
              type: 'getStrategy6',
              payload: {
                // entityId: urlParamsStrategyId,
                // userId: localStorageUserId
              }
            })
          }
          dispatch({
            type: 'updateState',
            payload: {
              isEdit: true
            }
          })
          const tableArray = ['table0', 'table1', 'table2']; //table0策略平仓盈亏, table1开仓信息, table2订单信息
          tableArray.forEach((tableId) => {
            const payload = location.query || {pageNum: 1, pageSize: 10};
            if (tableId === 'table0' && strategyType === '1') {
              dispatch({
                type: 'query',
                payload: {
                  ...payload,
                  tableId
                  // strategyId: urlParamsStrategyId,
                  // userId: localStorageUserId
                }
              });
            }
          });

        } else {
          dispatch({
            type: 'updateState',
            payload: {
              isEdit: false
            }
          })
        }
      })
    }
  },

  effects: {
    *spreadSymbol({payload}, {call, put, select}) {
      const data = yield call(strategyServices.spreadSymbol, payload);
      if (data.success && data.code === 0) {
        yield put({
          type: 'updateState',
          payload: {
            spreadSymbol: data.payload.data
          }
        })
      } else {
        throw data;
      }
    },
    *query({payload}, {call, put, select}) {
      const {tagsData1, tagsData2} = yield select(_ => _.strategy);
      const {tableId} = payload;
      let tagsParam = {};
      if (tableId === 'table1') {
        tagsData1.tags.forEach((item, index) => {
          tagsParam[tagsMap.get(item)] = tagsData1.selectedTags.indexOf(item) > -1;
        })
      }
      if (tableId === 'table2') {
        tagsData2.tags.forEach((item, index) => {
          tagsParam[tagsMap.get(item)] = tagsData2.selectedTags.indexOf(item) > -1;
        })
      }
      const param = {
        strategyId: urlParamsStrategyId,
        userId: localStorageUserId,
        ...payload,
        ...tagsParam
      }
      const mydata = yield call(strategyServices.queryAll, param);
      if (mydata.success && mydata.code === 0) {

        const data = mydata.payload.data || {};
        data.data = data.data || [];
        yield put({
          type: 'querySuccess',
          payload: {
            tableId: payload.tableId,
            data: data.data.map((item, index) => {
              return {...item};
            }),
            pagination: {
              showSizeChanger: false,
              showQuickJumper: false,
              size: 'large',
              showTotal: total => `共 ${total} 条`,
              current: data.pageNum,
              pageSize: data.pageSize,
              total: data.total
            }
          }
        });

      } else {
        throw mydata;
      }
    },
    *onInputChange({payload}, {call, put}) {
      if (payload.value === undefined) {return;}
      if (strategyType === '1') {
        switch (payload.name) {
          case 'XHJYS': {
            let param = {};
            switch (payload.value) {
              case 'OKEXSPOT': case 'OKEXFUTURE': case 'OKEXMARGIN':
                param.exchange = 'OKex';
                break;
              case 'HUOBISPOT': case 'HUOBIFUTURE':
                param.exchange = 'Huobi';
                break;
              default:
                param.exchange = payload.value;
                break;
            }
            // const param = {exchange: payload.value === 'OKEXSPOT' || payload.value === 'OKEXFUTURE' ? 'OKex' : payload.value};
            const data = yield call(strategyServices.tradingAccountList, param);
            yield put({
              type: 'updateState',
              payload: {
                XHJYS_userList: data.payload.data
              }
            })
            yield put({
              type: 'hackSelect',
              payload: {
                type: 'XHJYS'
              }
            })
            if (data.success) {
              if (data.code === 0) {
                yield put({
                  type: 'getTradingAccountListSuccess',
                  payload: {
                    type: 'XHJYS',
                    data: data.payload.data,
                    exchange: payload.value.toUpperCase() || ''
                  }
                })
              } else {
                throw data;
              }
            } else {
              throw data;
            }
            break;
          }
          case 'QHJYS': {
            // const param = {exchange: payload.value === 'OKEXFUTURE' ? 'OKex' : payload.value};
            let param = {};
            switch (payload.value) {
              case 'OKEXSPOT': case 'OKEXFUTURE':
                param.exchange = 'OKex';
                break;
              case 'HUOBISPOT': case 'HUOBIFUTURE':
                param.exchange = 'Huobi';
                break;
              default:
                param.exchange = payload.value;
                break;
            }
            const data = yield call(strategyServices.tradingAccountList, param);
            yield put({
              type: 'updateState',
              payload: {
                QHJYS_userList: data.payload.data
              }
            })
            yield put({
              type: 'hackSelect',
              payload: {
                type: 'QHJYS'
              }
            })
            if (data.success) {
              if (data.code === 0) {
                yield put({
                  type: 'getTradingAccountListSuccess',
                  payload: {
                    type: 'QHJYS',
                    data: data.payload.data,
                    exchange: payload.value.toUpperCase() || ''
                  }
                })
              } else {
                throw data;
              }
            } else {
              throw data;
            }
            break;
          }
          default:
            break;
        }
      }
      if (strategyType === '5') {
        switch (payload.name) {
          case 'QHJYS': {
            // const param = {exchange: payload.value === 'OKEXFUTURE' ? 'OKex' : payload.value};
            let param = {};
            switch (payload.value) {
              case 'OKEXSPOT': case 'OKEXFUTURE':
                param.exchange = 'OKex';
                break;
              case 'HUOBISPOT': case 'HUOBIFUTURE':
                param.exchange = 'Huobi';
                break;
              default:
                param.exchange = payload.value;
                break;
            }
            const data = yield call(strategyServices.tradingAccountList, param);
            yield put({
              type: 'updateState',
              payload: {
                QHJYS_userList: data.payload.data,
                currentExchange: payload.value
              }
            })
            yield put({
              type: 'hackSelect',
              payload: {
                type: 'QHJYS'
              }
            })
            if (data.success) {
              if (data.code === 0) {
                yield put({
                  type: 'getTradingAccountListSuccess',
                  payload: {
                    type: 'QHJYS',
                    data: data.payload.data,
                    exchange: payload.value.toUpperCase() || ''
                  }
                })
                yield put({
                  type: 'balanceList',
                  payload: {}
                })
              } else {
                throw data;
              }
            } else {
              throw data;
            }
            break;
          }
          default:
            break;
        }
        if (payload.reporter === 'capital') {
          if (payload.name === 'QHJYS_userName') {
            yield put({
              type: 'updateState',
              payload: {
                currentAccount: payload.value
              }
            })
          }
          if (payload.name === 'QHJYS_category') {
            yield put({
              type: 'updateState',
              payload: {
                currentSymbol: payload.value
              }
            })
          }

          yield put({
            type: 'balanceList'
          })

        }
      }

      if (strategyType === '6') {
        switch (payload.name) {
          case 'QHJYS': {
            // const param = {exchange: payload.value === 'OKEXFUTURE' ? 'OKex' : payload.value};
            let param = {};
            switch (payload.value) {
              case 'OKEXSPOT': case 'OKEXFUTURE':
                param.exchange = 'OKex';
                break;
              case 'HUOBISPOT': case 'HUOBIFUTURE':
                param.exchange = 'Huobi';
                break;
              default:
                param.exchange = payload.value;
                break;
            }
            const data = yield call(strategyServices.tradingAccountList, param);

            yield put({
              type: 'updateState',
              payload: {
                QHJYS_userList: data.payload.data,
                currentExchange: payload.value
              }
            })
            yield put({
              type: 'hackSelect',
              payload: {
                type: 'QHJYS'
              }
            })
            data.payload.data = (data.payload.data || []).filter((item, index) => {
              return !!item.passphrase;
            })
            if (data.success && data.code === 0) {
              yield put({
                type: 'getTradingAccountListSuccess',
                payload: {
                  type: 'QHJYS',
                  data: data.payload.data,
                  exchange: payload.value.toUpperCase() || ''
                }
              })
            } else {
              throw data;
            }
            break;
          }
          default:
            break;
        }
        if (payload.reporter === 'capital') {
          if (payload.name === 'QHJYS_userName') {
            yield put({
              type: 'updateState',
              payload: {
                currentAccount: payload.value
              }
            })
          }
          if (payload.name === 'QHJYS_category') {
            yield put({
              type: 'updateState',
              payload: {
                currentSymbol: payload.value
              }
            })
          }

          yield put({
            type: 'balanceList'
          })

        }
      }

    },
    *balanceList({payload}, {call, put, select}) {
      const {currentExchange, currentSymbol, currentAccount, QHJYS_userList} = yield select(state => state.strategy);
      const k = yield select(state => state.strategy);
      const accountList = QHJYS_userList;
      let temps;
      for (let i = 0; i < accountList.length; i++) {
        if (accountList[i].account === currentAccount) {
          temps = accountList[i];
        }
      }
      const param = {
        key: temps.access_id,
        secret: temps.secret_key,
        passphrase: temps.passphrase,
        exchange: currentExchange,
        currency: '',
        symbol: currentSymbol
      };
      const data = yield call(strategyServices.balanceList, param);
      if (data.success && data.code === 0) {
        yield put({
          type: 'updateAccountBalance',
          payload: {
            data: data.payload.data
          }
        })
      } else {
        throw data;
      }
    },
    *initOption({payload}, {call, put}) {
      if (payload.value === undefined) {return;}
      switch (payload.name) {
        case 'XHJYS': {
          //const param = {exchange: payload.value === 'OKEXSPOT' || payload.value === 'OKEXFUTURE' ? 'OKex' : payload.value};
          let param = {};
          switch (payload.value) {
            case 'OKEXSPOT': case 'OKEXFUTURE': case 'OKEXMARGIN':
              param.exchange = 'OKex';
              break;
            case 'HUOBISPOT': case 'HUOBIFUTURE':
              param.exchange = 'Huobi';
              break;
            default:
              param.exchange = payload.value;
              break;
          }
          const data = yield call(strategyServices.tradingAccountList, param);
          yield put({
            type: 'updateState',
            payload: {
              XHJYS_userList: data.payload.data
            }
          })
          yield put({
            type: 'hackSelect',
            payload: {
              type: 'XHJYS'
            }
          })
          if (data.success) {
            if (data.code === 0) {
              yield put({
                type: 'initOptionSuccess',
                payload: {
                  type: 'XHJYS',
                  data: data.payload.data,
                  exchange: payload.value.toUpperCase() || ''
                }
              })
            } else {
              throw data;
            }
          } else {
            throw data;
          }
          break;
        }
        case 'QHJYS': {
          // const param = {exchange: payload.value === 'OKEXFUTURE' ? 'OKex' : payload.value};
          let param = {};
          switch (payload.value) {
            case 'OKEXSPOT': case 'OKEXFUTURE':
              param.exchange = 'OKex';
              break;
            case 'HUOBISPOT': case 'HUOBIFUTURE':
              param.exchange = 'Huobi';
              break;
            default:
              param.exchange = payload.value;
              break;
          }
          const data = yield call(strategyServices.tradingAccountList, param);
          yield put({
            type: 'updateState',
            payload: {
              QHJYS_userList: data.payload.data
            }
          })
          yield put({
            type: 'hackSelect',
            payload: {
              type: 'QHJYS'
            }
          })
          if (data.success) {
            if (data.code === 0) {
              yield put({
                type: 'initOptionSuccess',
                payload: {
                  type: 'QHJYS',
                  data: data.payload.data,
                  exchange: payload.value.toUpperCase() || ''
                }
              })
            } else {
              throw data;
            }
          } else {
            throw data;
          }
          break;
        }
        default:
          break;
      }
    },
    *initOption5({payload}, {call, put}) {
      if (payload.value === undefined) {return;}
      let param = {};
      switch (payload.value) {
        case 'OKEXSPOT': case 'OKEXFUTURE':
          param.exchange = 'OKex';
          break;
        case 'HUOBISPOT': case 'HUOBIFUTURE':
          param.exchange = 'Huobi';
          break;
        default:
          param.exchange = payload.value;
          break;
      }
      const data = yield call(strategyServices.tradingAccountList, param);
      yield put({
        type: 'updateState',
        payload: {
          QHJYS_userList: data.payload.data
        }
      })
      yield put({
        type: 'hackSelect',
        payload: {
          type: 'QHJYS'
        }
      })
      if (data.success) {
        if (data.code === 0) {
          yield put({
            type: 'initOptionSuccess',
            payload: {
              type: 'QHJYS',
              data: data.payload.data,
              exchange: payload.value.toUpperCase() || ''
            }
          })
        } else {
          throw data;
        }
      } else {
        throw data;
      }
    },
    *initOption6({payload}, {call, put}) {
      if (payload.value === undefined) {return;}
      let param = {};
      switch (payload.value) {
        case 'OKEXSPOT': case 'OKEXFUTURE':
          param.exchange = 'OKex';
          break;
        case 'HUOBISPOT': case 'HUOBIFUTURE':
          param.exchange = 'Huobi';
          break;
        default:
          param.exchange = payload.value;
          break;
      }
      const data = yield call(strategyServices.tradingAccountList, param);
      data.payload.data = (data.payload.data || []).filter((item, index) => {
        return !!item.passphrase;
      })
      yield put({
        type: 'updateState',
        payload: {
          QHJYS_userList: data.payload.data
        }
      })
      yield put({
        type: 'hackSelect',
        payload: {
          type: 'QHJYS'
        }
      })
      if (data.success) {
        if (data.code === 0) {
          yield put({
            type: 'initOptionSuccess',
            payload: {
              type: 'QHJYS',
              data: data.payload.data,
              exchange: payload.value.toUpperCase() || ''
            }
          })
          // 获取最大开仓量信息
          yield put({
            type: 'balanceList',
            payload: {}
          })
        } else {
          throw data;
        }
      } else {
        throw data;
      }
    },
    /**
     * 获取网格套利列表
     *
     * @param {*} {payload}
     * @param {*} {call, put}
     */
    *fetchStrategyList({payload}, {call, put}) {
      const type = payload.strategyType || 1;
      const param = {
        userId: localStorageUserId,
        strategyType: type
      }
      const data = yield call(strategyServices.strategyList, param);
      if (data.success) {
        if (data.code === 0) {
          const listData = data.payload.data || [];
          listData.map((item, index) => {
            item.myIndex = ++index;
          })
          // 更新列表数据
          yield put({
            type: 'updateState',
            payload: {
              list: listData || []
            }
          })
        } else {
          throw data;
        }
      } else {
        throw data
      }
    },
    *strategyDetail({payload}, {call, put}) {
      const mypayload = {
        userId: localStorageUserId,
        entityId: urlParamsStrategyId
      }
      const data = yield call(strategyServices.strategyDetail, mypayload);
      if (data.success) {
        if (data.code === 0) {
          yield put({
            type: 'updateState',
            payload: {
              strategyDetail: data.payload.data || {}
            }
          })
        } else {
          throw data;
        }
      } else {
        throw data;
      }
    },
    *getStrategy({payload}, {call, put}) {
      const mypayload = {
        entityId: urlParamsStrategyId,
        userId: localStorageUserId
      }
      const data = yield call(strategyServices.getStrategy, mypayload);
      if (data.success && data.code === 0) {
        if (!data.payload.data) {
          const datamsg = {msg: '获取策略信息失败'};
          throw datamsg;
        } else {
          //if (data.code === 0) {
          const dataTemp = data.payload.data || {};
          const param = JSON.parse(dataTemp.param);
          const status = dataTemp.status;
          // 通过交易所获取帐户跟币种信息 a\b两个帐户
          yield put({
            type: 'initOption',
            payload: {
              name: 'XHJYS',
              value: param.accountConfigB.exchange
            }
          })
          yield put({
            type: 'initOption',
            payload: {
              name: 'QHJYS',
              value: param.accountConfigA.exchange
            }
          })
          yield put({
            type: 'getStrategySuccess',
            payload: {
              param,
              status
            }
          })

          // 获取k线url参数
          yield put({
            type: 'spreadSymbol',
            payload: {
              symbolsAndExchangeList: param.symbolsAndExchangeList
            }
          })
        }
      } else {
        throw data;
      }
    },

    *getStrategy5({payload}, {call, put}) { // 获取趋势策略参数
      const mypayload = {
        entityId: urlParamsStrategyId,
        userId: localStorageUserId
      }
      const data = yield call(strategyServices.getStrategy, mypayload);
      if (data.success && data.code === 0) {

        const dataTemp = data.payload.data || {};
        const param = JSON.parse(dataTemp.param);
        param.magicma = dataTemp.magicma;
        const status = dataTemp.status;
        // 通过交易所获取帐户跟币种信息 帐户
        yield put({
          type: 'initOption5',
          payload: {
            name: 'QHJYS',
            value: param.accountConfig.exchange
          }
        })

        yield put({
          type: 'getStrategySuccess5',
          payload: {
            param,
            status
          }
        })
      } else {
        throw data;
      }

    },

    *getStrategy6({payload}, {call, put}) { // 移动网格策略参数
      const mypayload = {
        entityId: urlParamsStrategyId,
        userId: localStorageUserId
      }
      const data = yield call(strategyServices.getStrategy, mypayload);
      if (data.success && data.code === 0) {

        const dataTemp = data.payload.data || {};
        const param = JSON.parse(dataTemp.param);
        param.magicma = dataTemp.magicma;
        param.candleDataQuoteMillisecond = param.candleDataQuoteMillisecond / 1000 / 60;
        const status = dataTemp.status;
        // 通过交易所获取帐户跟币种信息 帐户
        yield put({
          type: 'initOption6',
          payload: {
            name: 'QHJYS',
            value: param.accountConfig.exchange
          }
        })

        yield put({
          type: 'getStrategySuccess6',
          payload: {
            param,
            status
          }
        })
      } else {
        throw data;
      }

    },

    *strategyDailyBalance({payload}, {call, put}) {
      const mypayload = {
        userId: Number(localStorageUserId),
        ...payload
      }
      const data = yield call(strategyServices.strategyDailyBalance, mypayload);
      return data;
    },

    *editStrategy({payload}, {call, put}) {
      const {QHJYS, QHJYS_category, QHJYS_userName, XHJYS, XHJYS_category, XHJYS_userName, magicma, strategyId, ...paramsTemp} = payload;
      const param = {
        strategyId: strategyId,
        userId: localStorageUserId,
        param: JSON.stringify(paramsTemp)
      }
      const data = yield call(strategyServices.edit, param);

      if (data.success) {
        // yield put(routerRedux.push('/strategyList'));
        if (data.code === 0) {
          return data;
        }
        throw data;
      }
      throw data;
    },
    /**
     * 列表操作
     * @param {*} {payload}
     * @param {*} {call, put}
     * @returns
     */
    *handleOperate({payload}, {call, put}) {
      const {record, type} = payload;
      const mypayload = {
        userId: localStorageUserId,
        entityId: record.id
      }
      let data = null;
      switch (type) {
        case 'start': { // 开启服务
          data = yield call(strategyServices.start, mypayload);
          data.status = 1;
          break;
        }
        case 'stop': { // 停止服务
          const stoppayload = {
            userId: localStorageUserId,
            strategyIdList: [record.id]
          }
          data = yield call(strategyServices.stop, stoppayload);
          data.status = 0;
          break;
        }
        case 'remove': { // 删除服务
          data = yield call(strategyServices.remove, mypayload);
          break;
        }
        case 'stopAll': {
          const stoppayload = {
            entityId: localStorageUserId
          }
          data = yield call(strategyServices.stopAll, stoppayload);
          break;
        }
        default: {
          break;
        }
      }
      if (data.success && data.code === 0) {
        return data;
      }
      throw data;

    },
    *handleOpenInfo({payload}, {call, put}) {
      const {type, record} = payload;
      let data = null;
      switch (type) {
        case 'close': {
          const params = {
            strategyId: urlParamsStrategyId,
            openinfoId: record.id,
            userId: localStorageUserId
          }
          data = yield call(strategyServices.close, params)
          break;
        }
        default:
          break;
      }
      if (!!data && data.success) {
        if (data.code === 0) {
          return data;
        }
        throw data;
      }
      throw data;

    },
    *strategyAdd({payload}, {call, put, select}) {
      const {QHJYS_userList, XHJYS_userList} = yield select(state => state.strategy);
      const {strategyId, QHJYS, QHJYS_category, QHJYS_userName, XHJYS, XHJYS_category, XHJYS_userName, ...paramsTemp} = payload;
      const QHJYS_userData = queryArray(QHJYS_userList, QHJYS_userName, 'account');
      const XHJYS_userData = queryArray(XHJYS_userList, XHJYS_userName, 'account');
      const symbolsAndExchangeList = [
        {
          symbol: QHJYS_category || '',
          currency: '',
          exchange: QHJYS.toUpperCase()
        },
        {
          symbol: XHJYS === 'OKEXFUTURE' ? XHJYS_category || '' : XHJYS_category.split('_')[0] || '',
          currency: XHJYS === 'OKEXFUTURE' ? '' : XHJYS_category.split('_')[1] || '',
          exchange: XHJYS.toUpperCase()
        }
      ];
      const k = {
        accountConfigA: { // 期货
          exchange: QHJYS.toUpperCase() || '',
          key: QHJYS_userData.access_id || '',
          secret: QHJYS_userData.secret_key || '',
          accountName: QHJYS_userData.account || '',
          passphrase: QHJYS_userData.passphrase || ''
        },
        accountConfigB: {
          exchange: XHJYS.toUpperCase() || '',
          key: XHJYS_userData.access_id || '',
          secret: XHJYS_userData.secret_key || '',
          accountName: XHJYS_userData.account || '',
          passphrase: XHJYS_userData.passphrase || ''
        },
        symbolsAndExchangeList,
        ...paramsTemp
      }
      let param = {};
      if (strategyId) { // 如果存在策略id为修改策略，否则是新增
        // 修改策略
        param = {
          strategyId: strategyId,
          userId: localStorageUserId,
          param: JSON.stringify(k)
        }
        const data = yield call(strategyServices.edit, param);
        if (data.success) {
          // yield put(routerRedux.push('/strategyList'));
          if (data.code === 0) {
            return data;
          }
          throw data;
        } else {
          throw data;
        }
      } else {
        // 新增策略
        param = {
          strategyType: 106,
          userId: localStorageUserId,
          paramStr: JSON.stringify(k)
        }
        const data = yield call(strategyServices.strategyAdd, param);
        if (data.success) {
          if (data.code === 0) {
            yield put(routerRedux.push('/strategyDetail/' + data.payload.data.entityId));
          } else {
            throw data;
          }
        } else {
          throw data;
        }
      }
    },
    *strategyAdd5({payload}, {call, put, select}) {
      const {QHJYS_userList, myCurrentSymbol} = yield select(state => state.strategy);
      const {strategyId, QHJYS, QHJYS_category, QHJYS_userName, ...paramsTemp} = payload;
      const QHJYS_userData = queryArray(QHJYS_userList, QHJYS_userName, 'account');
      const symbolsAndExchange = {
        symbol: QHJYS_category || '',
        currency: '',
        exchange: QHJYS.toUpperCase()
      };
      paramsTemp.capital = Number(paramsTemp.capital);
      paramsTemp.symbol = myCurrentSymbol;
      const k = {
        accountConfig: { // 期货
          exchange: QHJYS.toUpperCase() || '',
          key: QHJYS_userData.access_id || '',
          secret: QHJYS_userData.secret_key || '',
          accountName: QHJYS_userData.account || '',
          passphrase: QHJYS_userData.passphrase || ''
        },
        symbolsAndExchange,
        ...paramsTemp
      }
      let param = {};
      if (strategyId) { // 如果存在策略id为修改策略，否则是新增
        // 修改策略
        param = {
          strategyId: strategyId,
          userId: localStorageUserId,
          param: JSON.stringify(k)
        }
        const data = yield call(strategyServices.edit, param);
        if (data.success && data.code === 0) {
          return data;
        }
        throw data;

      } else {
        // 新增策略
        param = {
          strategyType: 5,
          userId: localStorageUserId,
          paramStr: JSON.stringify(k)
        }
        const data = yield call(strategyServices.strategyAdd, param);
        if (data.success) {
          if (data.code === 0) {
            yield put(routerRedux.push('/strategyDetail/' + data.payload.data.entityId + '?type=5'));
          } else {
            throw data;
          }
        } else {
          throw data;
        }
      }

    },
    *strategyAdd6({payload}, {call, put, select}) {
      const {QHJYS_userList, myCurrentSymbol} = yield select(state => state.strategy);
      const {strategyId, QHJYS, QHJYS_category, QHJYS_userName, movingGridList, orderLmtPriceRatio, orderVol, movingProfitList, profitMax, retracement, ...paramsTemp} = payload;
      const QHJYS_userData = queryArray(QHJYS_userList, QHJYS_userName, 'account');
      const movingGridLists = [];
      const movingProfitLists = [];
      for (let i = 0; i < movingGridList.length; i++) {
        movingGridLists.push({orderLmtPriceRatio: orderLmtPriceRatio[movingGridList[i]], orderVol: orderVol[movingGridList[i]]});
      }
      for (let i = 0; i < movingProfitList.length; i++) {
        movingProfitLists.push({profitMax: profitMax[movingProfitList[i]], retracement: retracement[movingProfitList[i]]});
      }

      const symbolsAndExchange = {
        symbol: QHJYS_category || '',
        currency: '',
        exchange: QHJYS.toUpperCase()
      };
      paramsTemp.capital = Number(paramsTemp.capital);
      paramsTemp.symbol = myCurrentSymbol;
      paramsTemp.candleDataQuoteMillisecond = paramsTemp.candleDataQuoteMillisecond * 1000 * 60;
      const k = {
        accountConfig: { // 期货
          exchange: QHJYS.toUpperCase() || '',
          key: QHJYS_userData.access_id || '',
          secret: QHJYS_userData.secret_key || '',
          accountName: QHJYS_userData.account || '',
          passphrase: QHJYS_userData.passphrase || ''
        },
        symbolsAndExchange,
        movingGridList: movingGridLists,
        movingProfitList: movingProfitLists,
        ...paramsTemp
      }
      let param = {};
      if (strategyId) { // 如果存在策略id为修改策略，否则是新增
        // 修改策略
        param = {
          strategyId: strategyId,
          userId: localStorageUserId,
          param: JSON.stringify(k)
        }
        const data = yield call(strategyServices.edit, param);
        if (data.success && data.code === 0) {
          return data;
        }
        throw data;

      } else {
        // 新增策略
        param = {
          strategyType: 6,
          userId: localStorageUserId,
          paramStr: JSON.stringify(k)
        }
        const data = yield call(strategyServices.strategyAdd, param);
        if (data.success) {
          if (data.code === 0) {
            yield put(routerRedux.push('/strategyDetail/' + data.payload.data.entityId + '?type=6'));
          } else {
            throw data;
          }
        } else {
          throw data;
        }
      }

    }
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
    hackSelect(state, {payload}) {
      const {type} = payload;
      if (type === 'XHJYS') {
        state.strategyFormData[1].form[1].forceRender = true;
        state.strategyFormData[1].form[2].forceRender = true;
      } else if (type === 'QHJYS') {
        state.strategyFormData[0].form[1].forceRender = true;
        state.strategyFormData[0].form[2].forceRender = true;
      }
      return {...state};
    },
    getTradingAccountListSuccess(state, {payload}) {
      const {type, data, exchange} = payload;
      const options = [];
      for (let i = 0, len = data.length; i < len; i++) {
        options.push({label: data[i].account, value: data[i].account});
      }
      const category = deepClone(JYSCAT);
      if (type === 'XHJYS') {
        state.strategyFormData[1].form[1].options = options || [];
        if (options.length > 0) {
          state.strategyFormData[1].form[1].value = options[0].value || undefined;
        } else {
          state.strategyFormData[1].form[1].value = undefined;
        }
        state.strategyFormData[1].form[2].options = category[type][exchange] || [];
        state.strategyFormData[1].form[2].value = category[type][exchange][0].value || undefined;

        state.strategyFormData[1].form[1].forceRender = false;
        state.strategyFormData[1].form[2].forceRender = false;

        state.currentAccount = options[0].value || undefined;
        state.currentSymbol = category[type][exchange][0].value;
      }
      if (type === 'QHJYS') {
        state.strategyFormData[0].form[1].options = options || [];
        if (options.length > 0) {
          state.strategyFormData[0].form[1].value = options[0].value || undefined;
        } else {
          state.strategyFormData[0].form[1].value = undefined;
        }
        state.strategyFormData[0].form[2].options = category[type][exchange] || [];
        state.strategyFormData[0].form[2].value = category[type][exchange][0].value || undefined;

        state.strategyFormData[0].form[1].forceRender = false;
        state.strategyFormData[0].form[2].forceRender = false;

        state.currentAccount = options[0].value || undefined;
        state.currentSymbol = category[type][exchange][0].value;
      }
      state.accountList = data;
      return {...state}
    },

    initOptionSuccess(state, {payload}) {
      const {type, data, exchange} = payload;
      const options = [];
      for (let i = 0, len = data.length; i < len; i++) {
        options.push({label: data[i].account, value: data[i].account});
      }
      const category = deepClone(JYSCAT);
      if (type === 'XHJYS') {
        if (exchange === 'OKEXFUTURE') {
          state.strategyFormData[1].form[2].unrewriteable = false;
        }
        state.strategyFormData[1].form[1].options = options || [];
        state.strategyFormData[1].form[2].options = category[type][exchange] || [];
        state.strategyFormData[1].form[1].forceRender = false;
        state.strategyFormData[1].form[2].forceRender = false;
      }
      if (type === 'QHJYS') {
        if (exchange === 'OKEXFUTURE') {
          state.strategyFormData[0].form[2].unrewriteable = false;
        }
        state.strategyFormData[0].form[1].options = options || [];
        state.strategyFormData[0].form[2].options = category[type][exchange] || [];
        state.strategyFormData[0].form[1].forceRender = false;
        state.strategyFormData[0].form[2].forceRender = false;
      }
      return {...state}
    },

    getStrategySuccess(state, {payload}) {
      state.strategyFormData = deepClone(strateForm);
      const {param, status} = payload;
      state.currentStrategyStatus = status;
      state.strategyFormData[0].form.map((item, index) => {
        item.value = param[item.name];
      })
      state.strategyFormData[0].form[0].value = param.accountConfigA.exchange;
      state.strategyFormData[0].form[1].value = param.accountConfigA.accountName;
      state.strategyFormData[0].form[2].value = param.symbolsAndExchangeList[0].symbol;

      state.strategyFormData[1].form.map((item, index) => {
        item.value = param[item.name];
      })
      state.strategyFormData[1].form[0].value = param.accountConfigB.exchange;
      state.strategyFormData[1].form[1].value = param.accountConfigB.accountName;
      state.strategyFormData[1].form[2].value = param.symbolsAndExchangeList[1].symbol + (param.symbolsAndExchangeList[1].currency === '' ? '' : '_' + param.symbolsAndExchangeList[1].currency);

      state.strategyFormData[2].form.map((item, index) => {
        item.value = param[item.name];
      })

      state.isStopClose = param['isStopClose'];
      state.isStopOpen = param['isStopOpen'];
      state.isCloseAll = param['isCloseAll'];

      state.currentStrategyName = param['magicma'];
      return {...state};
    },
    getStrategySuccess5(state, {payload}) {
      state.strategyFormData = deepClone(strateForm);
      const {param, status} = payload;
      state.currentStrategyStatus = status;
      state.strategyFormData[0].form.map((item, index) => {
        if (item.name === 'capital') {
          item.value = String(param[item.name]);
          item.addonAfter = <span>{param.symbol}</span>;
        } else {
          item.value = param[item.name];
        }
      })
      state.strategyFormData[0].form[0].value = param.accountConfig.exchange;
      state.strategyFormData[0].form[1].value = param.accountConfig.accountName;
      state.strategyFormData[0].form[2].value = param.symbolsAndExchange.symbol;

      state.strategyFormData[1].form.map((item, index) => {
        item.value = param[item.name];
      })

      state.isStopClose = param['isStopClose'];
      state.isStopOpen = param['isStopOpen'];
      state.isCloseAll = param['isCloseAll'];

      state.currentStrategyName = param['magicma'];
      return {...state};
    },
    getStrategySuccess6(state, {payload}) {
      state.strategyFormData = deepClone(strateForm);
      const {param, status} = payload;
      state.currentExchange = param.symbolsAndExchange.exchange;
      state.currentSymbol = param.symbolsAndExchange.symbol;
      state.currentAccount = param.accountConfig.accountName;
      state.currentStrategyStatus = status;
      state.strategyFormData[0].form.map((item, index) => {
        if (item.name === 'capital') {
          item.value = String(param[item.name]);
          item.addonAfter = <span>{param.symbol}</span>;
        } else {
          item.value = param[item.name];
        }
      })
      state.strategyFormData[0].form[0].value = param.accountConfig.exchange;
      state.strategyFormData[0].form[1].value = param.accountConfig.accountName;
      state.strategyFormData[0].form[2].value = param.symbolsAndExchange.symbol;

      state.strategyFormData[1].form.map((item, index) => {
        item.value = param[item.name];
      })

      state.isStopClose = param['isStopClose'];
      state.isStopOpen = param['isStopOpen'];
      state.isCloseAll = param['isCloseAll'];

      state.currentStrategyName = param['magicma'];
      return {...state};
    },
    updateAccountBalance(state, {payload}) {
      state.strategyFormData[0].form[6].value = String(payload.data.balance);
      state.strategyFormData[0].form[6].addonAfter = <span>{payload.data.symbol}</span>;
      state.strategyFormData[1].form[10].title = `网格设置(订单量总数不能大于${payload.data.openVolMax})`;
      state.myCurrentSymbol = payload.data.symbol;
      state.openVolMax = payload.data.openVolMax;
      return {...state};
    },
    updateTagsSelect(state, {payload}) {
      const {tag, checked, id} = payload;
      if (checked) {
        state[`tagsData${id}`].selectedTags.push(tag);
      } else {
        state[`tagsData${id}`].selectedTags = state[`tagsData${id}`].selectedTags.filter((item) => {
          return item !== tag;
        })
      }
      return {...state};
    },
    resetState(state, {payload}) {
      state.strategyListColumns = strategyListColumnsData;
      state.strategyFormData = strateForm;
      state.tagsData1 = deepClone(filtersData);
      state.tagsData2 = deepClone(filtersData);
      state.strategyDetail = {};
      state.currentStrategyName = '';
      state.isStopClose = null; // 停止平仓
      state.isStopOpen = null; // 停止开仓
      state.currentStrategyStatus = null;
      return {...state};
    }
  }

})
