import React, {Component} from 'react';
import {connect} from 'dva';
import {EventHandler} from 'utils/EventHandler';
import {Row, Col, Form} from 'antd';
import {FontLayout, MyModal, MyInput} from 'components';
import styles from './app.less';

window.eventHandler = new EventHandler();
const {Header, Footer} = FontLayout;
const namespace = 'app';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const {dispatch} = this.props;
    // dispatch({
    //   type: `${namespace}/updataModalState`,
    //   payload: {
    //     modalId: 'loginModal',
    //     visible: true
    //   }
    // })
    window.eventHandler.on('SHOWLOGINMODAL', function() {
      dispatch({
        type: `${namespace}/updateState`,
        payload: {
          logined: false
        }
      })
      dispatch({
        type: `${namespace}/updataModalState`,
        payload: {
          modalId: 'loginModal',
          visible: true
        }
      })
    })
    window.eventHandler.on('HIDELOGINMODAL', function(islogined) {
      dispatch({
        type: `${namespace}/updataModalState`,
        payload: {
          modalId: 'loginModal',
          visible: false
        }
      })
      if (islogined) {
        dispatch({
          type: `${namespace}/updateState`,
          payload: {
            logined: true
          }
        })
      }
    })
  }
  handleSubmit() {
    const {form, dispatch} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: `${namespace}/handleSubmit`,
          payload: values
        })
      }
    })
  }
  render() {
    const _this = this;
    const {children, app, dispatch, form, loading} = this.props;
    const {isWidescreen, nav, logined, showLoginModal, modalData, loginModalFormData} = app;
    window.isWidescreen = isWidescreen;
    const formLayout = isWidescreen ? 'horizontal' : 'vertical';
    const headerProps = {
      isWidescreen,
      nav,
      logined
    }

    const loginDom = <Form layout={formLayout}><Row gutter={12}>
      {
        (loginModalFormData || []).map((x, y) => {
          return (
            <Col sm={24} md={12} key={y}>
              <MyInput data={x} form={form} dispatch={dispatch} namespace={namespace} />
            </Col>
          );
        })
      }
    </Row></Form>
    const {visible} = modalData.loginModal;
    const loginProps = {
      visible,
      dom: loginDom,
      title: '帐户登录',
      confirmLoading: !!loading.effects[`${namespace}/handleSubmit`],
      onOk: () => {this.handleSubmit()},
      onCancel: () => {
        dispatch({
          type: `${namespace}/updataModalState`,
          payload: {
            modalId: 'loginModal',
            visible: false
          }
        })
      }
    }
    return (
      <div className={styles.contain}>
        <Header {...headerProps}></Header>
        <div className={styles.wp}>
          {showLoginModal}
          {children}
        </div>
        <Footer></Footer>
        {!!visible && <MyModal {...loginProps}></MyModal>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    loading: state.loading
  }
}
export default connect(mapStateToProps)(Form.create({})(App))
