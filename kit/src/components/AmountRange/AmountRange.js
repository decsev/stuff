/**
 * 数字范围组件
 */
import './AmountRange.less';
import React, {Component} from 'react';
import {Form, Row, Col, Input, Button, Icon, DatePicker, Select, InputNumber, Radio, Cascader} from 'antd';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value1 = nextProps.value ? nextProps.value.value1 : '';
      const value2 = nextProps.value ? nextProps.value.value2 : '';
      this.setState({
        value1,
        value2
      });
    }
  }
  triggerChange(changedValue) {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  onChange1(e) {
    let value1 = e.target.value;
    let reg = /^(0|[1-9][0-9]*)$/;
    if (/^(0|[1-9][0-9]*)$/.test(value1) || value1 == '') {
      this.setState({
        value1
      });
      this.triggerChange({value1})
    }
  }
  onChange2(e) {
    let value2 = e.target.value;
    let reg = /^(0|[1-9][0-9]*)$/;
    if (/^(0|[1-9][0-9]*)$/.test(value2) || value2 == '') {
      this.setState({
        value2
      });
      this.triggerChange({value2})
    }
  }
  render() {
    let {className} = this.props;
    return (
      <span className="amount-group">
        <Input
          onChange={this.onChange1.bind(this)}
          value={this.state.value1}
          style={{width: '44%', marginRight: '4%'}}
          className="ant-short-input"
        />
        至
        <Input
          onChange={this.onChange2.bind(this)}
          value={this.state.value2}
          style={{width: '44%', marginLeft: '4%'}}
          className="ant-short-input"
        />
      </span>
    );
  }
}
export default Index;