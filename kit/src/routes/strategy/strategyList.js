import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {changeTitle, queryURL} from 'utils';
import {Row, Col, Table, Tag, Button, Modal, Spin, Tabs} from 'antd';
import styles from './strategy.less';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

const namespace = 'strategy';
class StrategyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: queryURL('type', this.props.location.search) || '1'
    };
    this.dispatch = this.props.dispatch;
  }
  componentDidMount() {
    changeTitle('策略列表 - 云端策略');
    // 获取网格套利列表
    this.fetchStrategyList(this.state.type);
  }
  fetchStrategyList(type) {
    this.dispatch({
      type: `${namespace}/fetchStrategyList`,
      payload: {
        strategyType: type || '1'
      }
    })
  }
  handleTabChange(key) {
    this.setState({
      type: key
    })
    this.fetchStrategyList(key);
  }
  render() {
    const {strategy, dispatch, loading, app} = this.props;
    const {isWidescreen} = app;
    const {list, strategyListColumns} = strategy;
    const stopAppStrategy = () => {
      dispatch({
        type: `${namespace}/stopAllStrategy`,
        payload: {}
      })
    }
    const handleOperate = (record, type) => {
      const _this = this;
      switch (type) {
        case 'remove': {
          confirm({
            title: '消息提示',
            content: '确定要删除该条策略？',
            onOk() {
              dispatch({
                type: `${namespace}/handleOperate`,
                payload: {
                  record,
                  type
                }
              }).then((res) => {
                if (res.success) {
                  dispatch({
                    type: `${namespace}/fetchStrategyList`,
                    payload: {
                      strategyType: _this.state.type || '1'
                    }
                  })
                }
              })
            },
            onCancel() {

            }
          });
          break;
        }
        case 'stopAll': {
          confirm({
            title: '消息提示',
            content: '确定要停止所有策略？',
            onOk() {
              dispatch({
                type: `${namespace}/handleOperate`,
                payload: {
                  record,
                  type
                }
              }).then((res) => {
                if (res.success) {
                  dispatch({
                    type: `${namespace}/fetchStrategyList`,
                    payload: {
                      strategyType: _this.state.type || '1'
                    }
                  })
                }
              })
            },
            onCancel() {

            }
          });
          break;
        }
        default: {
          confirm({
            title: '消息提示',
            content: '确定要执行此操作？',
            onOk() {
              dispatch({
                type: `${namespace}/handleOperate`,
                payload: {
                  record,
                  type
                }
              }).then((res) => {
                if (res.success) {
                  dispatch({
                    type: `${namespace}/fetchStrategyList`,
                    payload: {
                      strategyType: _this.state.type || '1'
                    }
                  })
                }
              });
            },
            onCancel() {

            }
          });

        }
      }

    }
    const tableOperate1 = {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (param, record) => {
        const {status} = record;
        return (
          <div>
            {status === 0 ? <Button style={{margin: '3px'}} onClick={() => {handleOperate(record, 'start')}}>开启策略</Button> : <Button style={{margin: '3px'}} onClick={() => {handleOperate(record, 'stop')}}>停止策略</Button>}
            <Button style={{margin: '3px'}} type="danger" onClick={() => {handleOperate(record, 'remove')}}>删除策略</Button>
          </div>)
      }
    };
    const tableOperate5 = {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (param, record) => {
        const {status} = record;
        return (
          <div>
            {status === 0 ? <Button style={{margin: '3px'}} onClick={() => {handleOperate(record, 'start')}}>开启策略</Button> : <Button style={{margin: '3px'}} onClick={() => {handleOperate(record, 'stop')}}>停止策略</Button>}
            <Button style={{margin: '3px'}} type="danger" onClick={() => {handleOperate(record, 'remove')}}>删除策略</Button>
          </div>)
      }
    };
    let myColumns1 = [];
    let myColumns5 = [];
    myColumns1 = myColumns1.concat(strategyListColumns, tableOperate1);
    myColumns5 = myColumns5.concat(strategyListColumns, tableOperate5);
    const tableListProps1 = {
      columns: myColumns1,
      dataSource: list,
      rowKey: record => record.id
    }
    const tableListProps5 = {
      columns: myColumns5,
      dataSource: list,
      rowKey: record => record.id
    }
    const tableListProps6 = {
      columns: myColumns5,
      dataSource: list,
      rowKey: record => record.id
    }
    const operations = <Button onClick={() => {dispatch(routerRedux.push('/account'))}}>帐户汇总</Button>;
    return (
      <div>
        {isWidescreen && <div className="jumbotron bg_demo" style={{marginBottom: '0px'}}>
          <div className="container">
            <h1 className="display-3 page_top_title">云端策略</h1>
          </div>
        </div>}
        <div className="container">
          <Tabs onChange={(e) => {this.handleTabChange(e);}} tabBarExtraContent={operations}>
            {this.state.type === '1' && <TabPane tab="网格套利策略" key="1">
              <Row gutter={8} style={{paddingBottom: '20px', paddingTop: '20px'}}>
                <Col>
                  <ButtonGroup>
                    <Button type="primary" onClick={() => {
                      //dispatch(routerRedux.push('/strategyAdd'));
                      window.open(window.location.href.replace(window.location.hash, '') + '#/strategyAdd', '_blank')
                    }}>新增策略</Button>
                    <Button type="default" onClick={() => {handleOperate({}, 'stopAll')}}>停止所有策略</Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row gutter={8}>
                <Table {...tableListProps1} bordered scroll={{x: true}} loading={!!loading.effects[`${namespace}/fetchStrategyList` || !!loading.effects[`${namespace}/handleOperate`]]} />
              </Row>
            </TabPane>}
            {this.state.type === '5' && <TabPane tab="趋势策略" key="5">
              <Row gutter={8} style={{paddingBottom: '20px', paddingTop: '20px'}}>
                <Col>
                  <ButtonGroup>
                    <Button type="primary" onClick={() => {
                      //dispatch(routerRedux.push('/strategyAdd'));
                      window.open(window.location.href.replace(window.location.hash, '') + '#/strategyAdd?type=5', '_blank')
                    }}>新增策略</Button>
                    <Button type="default" onClick={() => {handleOperate({}, 'stopAll')}}>停止所有策略</Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row gutter={8}>
                <Table {...tableListProps5} bordered scroll={{x: true}} loading={!!loading.effects[`${namespace}/fetchStrategyList` || !!loading.effects[`${namespace}/handleOperate`]]} />
              </Row>
            </TabPane>}

            {this.state.type === '6' && <TabPane tab="移动网格" key="6">
              <Row gutter={8} style={{paddingBottom: '20px', paddingTop: '20px'}}>
                <Col>
                  <ButtonGroup>
                    <Button type="primary" onClick={() => {
                      //dispatch(routerRedux.push('/strategyAdd'));
                      window.open(window.location.href.replace(window.location.hash, '') + '#/strategyAdd?type=6', '_blank')
                    }}>新增策略</Button>
                    <Button type="default" onClick={() => {handleOperate({}, 'stopAll')}}>停止所有策略</Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row gutter={8}>
                <Table {...tableListProps6} bordered scroll={{x: true}} loading={!!loading.effects[`${namespace}/fetchStrategyList` || !!loading.effects[`${namespace}/handleOperate`]]} />
              </Row>
            </TabPane>}

          </Tabs>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    strategy: state.strategy,
    loading: state.loading,
    app: state.app
  }
}
export default connect(mapStateToProps)(StrategyList);
