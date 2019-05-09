import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal} from 'antd';
import styles from './index.less';
const emptyImg = require('./empty.png');
class MyEmpty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {dispatch, dom, ...modalProps} = this.props;
    return (
      <div className={styles.empty_box}>
        <div className={styles.empty_img}>
          <img src={emptyImg}></img>
        </div>
        <p>暂无数据</p>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
  }
}
export default connect(mapStateToProps)(MyEmpty)