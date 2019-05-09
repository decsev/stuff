import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal} from 'antd';

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {dispatch, dom, ...modalProps} = this.props;
    return (
      <Modal {...modalProps}>
        {dom}
      </Modal>
    );

  }
}

function mapStateToProps(state) {
  return {
  }
}
export default connect(mapStateToProps)(MyModal)