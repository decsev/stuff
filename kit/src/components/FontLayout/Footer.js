import React, {Component} from 'react';
import {connect} from 'dva';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return null;
    // return (
    //   <div style={{textAlign: 'center'}}>Copyright 2018 币赢(TokenWin.one) 关于我们 客服微信:BlockExAi</div>
    // );
  }
}

function mapStateToProps(state) {
  return {
  }
}
export default connect(mapStateToProps)(Footer)