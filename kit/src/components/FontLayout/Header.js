import React, {Component} from 'react'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Menu, Icon} from 'antd'
import styles from './index.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick(e) {
    const {key} = e;
    if (/^http.*/g.test(key)) {
      window.open(key, '_blank');
    } else {
      window.location.href = window.location.origin + key;
    }
  }
  render() {
    const {isWidescreen, nav, logined} = this.props;
    return null;
    // return (
    //   <div className={styles.header}>
    //     <div className={styles.logo}>
    //       数字财经<span>BlockEx.ai</span>
    //     </div>
    //     <div className={styles.menu}>
    //       <Menu
    //         onClick={(e) => {this.handleClick(e)}}
    //         selectedKeys={[this.state.current]}
    //         mode="horizontal"
    //         theme="dark"
    //       >
    //         {(nav || []).map((item, index) => {
    //           if (item.sub) {
    //             return <SubMenu key={index} title={<span className="submenu-title-wrapper">{item.icon && <Icon type={item.icon} />}{item.name}</span>}>
    //               {(item.sub || []).map((x, y) => {
    //                 return <Menu.Item key={x.url}>{x.name}</Menu.Item>
    //               })}
    //             </SubMenu>
    //           }
    //           return <Menu.Item key={item.url}>
    //             {item.icon && <Icon type={item.icon} />}{item.name}
    //           </Menu.Item>

    //         })}
    //       </Menu>
    //     </div>
    //     <div className={styles.userCenter}>
    //       {logined ? <p><span onClick={() => {this.handleClick({key: '/home/custom'})}}>用户中心</span></p> : <p><span onClick={() => {this.handleClick({key: '/home/index/reg'})}}>注册</span> | <span onClick={() => {window.eventHandler.emit('SHOWlOGINMODAL')}}>登录</span></p>}
    //     </div>
    //   </div>
    // );
  }
}

function mapStateToProps(state) {
  return {
  }
}
export default connect(mapStateToProps)(Header)
