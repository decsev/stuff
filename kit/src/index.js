import {message} from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import 'babel-polyfill'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true
  }),
  onError(error) {
    message.error(error.msg || error.message)
  }
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
