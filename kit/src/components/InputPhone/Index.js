/** 
 * 电话组件，业务专用
 */
import './Index.less';
import React, {Component} from 'react';
import {Form, Row, Col, Input, Button, Icon, DatePicker, Select, InputNumber, Radio, Cascader, Popconfirm, Message} from 'antd';
import classnames from 'classnames';

class Index extends Component {
  constructor(props) {
    super(props);
    const value = this.props.data.value || this.props.data.defaultValue;
    this.state = {
      value
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      let value = nextProps.value;
      if (typeof value === 'object') {
        value = value.value;
      }
      this.setState({
        value
      });
    }
  }
  triggerChange(changedValue) {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  onChange(e) {
    const value = e.target.value;
    this.setState({
      value
    });
    this.triggerChange({value});
  }
  onCall() {
    const phone = this.state.value;
    const {dispatch} = this.props;
    if (!phone) {
      Message.error('电话号码为空！');
    } else {
      dispatch({
        type: 'userInfoDetail/callCRM',
        payload: {
          data: phone
        }
      })
    }
  }
  render() {
    const data = this.props.data;
    return (
      <Input
        placeholder={this.props.placeholder || this.props.data.text}
        onChange={this.onChange.bind(this)}
        value={this.state.value}
        addonAfter={<Popconfirm title="确定呼叫该号码吗？" onConfirm={this.onCall.bind(this)}>
          <Icon type="phone" />
        </Popconfirm>}
        disabled={data.readOnly || false}
        id={data.name}
      />
    );
  }
}
export default Index;
