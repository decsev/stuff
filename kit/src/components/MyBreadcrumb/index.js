import {
  HashRouter as Router, Route, Switch, Link, withRouter
} from 'react-router-dom';
import {Breadcrumb, Alert} from 'antd';
import pathToRegexp from 'path-to-regexp';
import styles from './index.less'

const breadcrumbNameMap = {
  '/strategyAdd': '新增策略',
  '/strategyDetail/:id': '策略详情',
  '/account/:id': '帐户信息'
};
const getUrlTitle = (url) => {
  let temp = null;
  for (let key in breadcrumbNameMap) {
    const re = pathToRegexp(key);
    if (re.exec(url)) {
      temp = {
        u: url,
        t: breadcrumbNameMap[key]
      }
    }
  }
  return temp;
}
const MyBreadcrumb = withRouter((props) => {
  const {location} = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const myBreadObj = getUrlTitle(url);
    if (myBreadObj) {
      return (
        <Breadcrumb.Item key={myBreadObj.u}>
          <Link to={myBreadObj.u}>
            {myBreadObj.t}
          </Link>
        </Breadcrumb.Item>
      );
    }

  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/strategyList">我的策略</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);
  return (
    <div className={styles.myBreadcrumb}>
      <Breadcrumb separator=">">
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  );
});

export default MyBreadcrumb;