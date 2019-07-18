import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Link} from 'react-router-dom';
import styles from './index.less';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {activeIndex} = this.props;
    return (
      <nav className={styles.my_nav}>
        <ul>
          <li className={activeIndex === 0 ? styles.active : ''}><Link to="/kit">我的持仓</Link></li>
          <li className={activeIndex === 1 ? styles.active : ''}><Link to="/kit/myInterest">我的借贷</Link></li>
          <li className={activeIndex === 2 ? styles.active : ''}><Link to="/kit/grid">网格工具</Link></li>
          <li className={activeIndex === 3 ? styles.active : ''}><Link to="/kit/interest">计息工具</Link></li>
          <li><a href="https://eniu.com/" target="_blank">亿牛</a></li>
          <li><a href="https://www.legulegu.com/stockdata/market_pe" target="_blank">乐估</a></li>
        </ul>
      </nav>
    );
  }
}

export default Index;