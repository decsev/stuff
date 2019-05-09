
export default {

  namespace: 'example',

  state: {
    title: '我是标题',
    content: '我是内容'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({type: 'save'})
    }
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    }
  }

}
