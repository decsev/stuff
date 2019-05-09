/**
 * 数字组件
 */
import './Amount.less';
import React, {Component} from 'react';
import {Form, Row, Col, Input, Button, Icon, DatePicker, Select, InputNumber, Radio, Cascader} from 'antd';
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
    const reg = /^(0|[1-9][0-9]*)$/;
    if (/^(0|[1-9][0-9]*)$/.test(value) || value == '') {
      this.setState({
        value
      });
      this.triggerChange({value});
    }
  }
  render() {
    return (
      <Input
        placeholder={this.props.data.text}
        onChange={this.onChange.bind(this)}
        value={this.state.value}
      />
    );
  }
}
export default Index;
