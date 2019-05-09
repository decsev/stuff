import modelExtend from 'dva-model-extend';
import {deepClone} from 'utils';

const model = {
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

const pageModel = modelExtend(model, {

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: 0
    }
  },

  reducers: {
    querySuccess(state, {payload}) {
      const {list, pagination} = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination
        }
      }
    }
  }

})


const defaultState = {
  tablesData: {
    default: {
      data: [],
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        current: 1,
        total: 0
      }
    }
  },
  searchValue: {}
};

const getTableModel = (namespace, services) => {
  const {create, remove, queryAll, query, update} = services;
  return modelExtend(model, {

    state: deepClone(defaultState),

    effects: {

      * delete({payload}, {call, put, select}) {
        const userId = yield select(state => state.app.userInfo.userVo.id);
        const data = yield call(remove, {id: payload.id, tableId: payload.tableId, userId});
        const {selectedRowKeys} = yield select(_ => _[namespace]);
        if (!!data && data.code === '200') {
          yield put({
            type: 'updateState',
            payload: {
              selectedRowKeys: {
                ...selectedRowKeys,
                [payload.tableId]: selectedRowKeys[payload.tableId].filter(_ => _ !== payload)
              }
            }
          });
          yield put({type: 'query', payload: {tableId: payload.tableId}});
        } else {
          throw data;
        }
      },

      * query({payload = {}}, {select, call, put}) {
        const searchValue = yield select(state => state[namespace].searchValue[payload.tableId]);
        payload.pageNum = payload.current;
        payload = {...payload, ...searchValue};
        const data = yield call(queryAll, payload);
        if (!!data && data.code === '200') {
          data.data = data.data || {};
          yield put({
            type: 'querySuccess',
            payload: {
              tableId: payload.tableId,
              data: (data.data.list || data.data.content || []).map((item, index) => {
                return {
                  ...item,
                  order: ((Number(payload.current) || 1) - 1) * (Number(payload.pageSize) || 10) + (index + 1)
                };
              }),
              pagination: {
                current: Number(payload.current) || 1,
                pageSize: Number(payload.pageSize) || 10,
                total: Number(data.data.total) || 0
              }
            }
          });
        }
      },

      * update({payload}, {select, call, put}) {
        let [id, newData, data] = ['', null, null];
        const userId = yield select(state => state.app.userInfo.userVo.id);
        switch (payload.modalType) {
          case 'edit':
            id = yield select(state => state[namespace].editingItem.data.id);
            newData = {tableId: payload.tableId, userId, ...payload.data, id};
            data = yield call(update, newData);

            if (!!data && data.code === '200') {
              yield put({type: 'hideModal'});
              yield put({
                type: 'query',
                payload: {
                  tableId: payload.tableId,
                  current: payload.pagination.current,
                  pageSize: payload.pagination.pageSize
                }
              });
            } else {
              throw data;
            }
            break;
          default:
            yield put({type: payload.modalType, payload});
            break;
        }
      }

    },

    reducers: {
      querySuccess(state, {payload}) {
        const {tableId, data, pagination} = payload;
        const tablesData = state.tablesData || {};
        return {
          ...state,
          tablesData: {
            ...tablesData,
            [tableId || 'default']: {
              data,
              pagination: {
                ...state.pagination,
                ...pagination
              }
            }
          }
        };
      },

      onInputChange(state, {payload}) {
        const {name: inputName, value: inputValue, reporter} = payload;
        const formLogicGroup = state.formLogicGroup || [];

        const newData = {};

        if (reporter) {
          formLogicGroup.forEach((dataKey) => {
            const configData = state[dataKey];
            if (configData instanceof Array) {
              configData.forEach((inputConfig, index) => {
                // 一维数组
                if (inputConfig.receiver === reporter) {
                  newData[dataKey] = [...configData];
                  newData[dataKey][index].value = inputConfig.receiverHandler(inputValue);
                }
              });
            } else if (configData instanceof Object) {
              for (const key in configData) {
                configData[key].forEach((inputConfig, index) => {
                  if (inputConfig.receiver === reporter) {
                    newData[dataKey] = {...configData};
                    newData[dataKey][key][index].value = inputConfig.receiverHandler(inputValue);
                  }
                });
              }
            }
          });
        }
        return {
          ...state,
          ...newData
        };
      },

      showModal(state, {payload}) {
        const currentModal = {};
        currentModal.config = state.inputConfig[payload.modalType];

        currentModal.config.forEach((item) => {
          if (item.name === 'address') {
            item.value = payload.editingItem.data[item.name] ? payload.editingItem.data[item.name].split(' ') : '';
          } else {
            item.value = payload.editingItem.data[item.name] === 0 ||
              !!payload.editingItem.data[item.name] ?
              payload.editingItem.data[item.name] : '';
          }
        });
        return {...state, ...payload, currentModal, modalVisible: true};
      },

      hideModal(state) {
        return {...state, currentModal: {}, modalVisible: false};
      },

      switchIsMotion(state) {
        // window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion);
        return {...state, isMotion: !state.isMotion};
      },

      initState(state, {payload}) {
        return {
          ...deepClone(defaultState),
          ...payload
        };
      }
    }
  });
};

const defaultModalState = {
  modalData: {
    defalut: {
      visible: false
    }
  }
}
const modalModel = (namespace, services) => {
  const {updateModal} = services;
  return modelExtend(model, {
    namespace,
    state: deepClone(defaultModalState),
    effects: {
      *handleSubmit({payload}, {call, put, select}) {
        const data = yield call(services.auth, payload);
        if (data.success && data.code === 0) {
          const mydata = data.payload.data;
          const {Token, Regnumber, vip, level} = mydata;
          localStorage.setItem('_t', Token);
          localStorage.setItem('_n', Regnumber);
          localStorage.setItem('_v', vip);
          localStorage.setItem('_l', level);
          window.eventHandler.emit('HIDELOGINMODAL', true);
          window.location.reload();
        } else {
          throw data;
        }
      }
    },
    reducers: {
      initModalState(state, {payload}) {
        const {modalId} = payload;
        return {
          ...state,
          modalData: {
            ...state.modalData,
            [modalId || 'defalut']: deepClone(defaultModalState.modalData.defalut)
          }
        }
      },
      updataModalState(state, {payload}) {
        const {modalId, ...param} = payload;
        for (let i in param) {
          state.modalData[modalId || 'defalut'][i] = param[i];
        }
        return {
          ...state
        }
      }
    }
  })
}
module.exports = {
  model,
  pageModel,
  getTableModel,
  modalModel
}
