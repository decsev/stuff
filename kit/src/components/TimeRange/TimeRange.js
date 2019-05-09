/**
 * Created by lianxc on 2017/10/30.
 * 时间段组件
 */
import './TimeRange.less';
import React, {Component} from 'react';
import classnames from 'classnames';
import moment from 'moment';
import {Form, Row, Col, Input, Button, Icon, DatePicker, Select, InputNumber, Radio, Cascader, TimePicker} from 'antd';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: null,
      value2: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value1 = nextProps.value ? nextProps.value.value1 : null;
      const value2 = nextProps.value ? nextProps.value.value2 : null;
      this.setState({
        value1,
        value2
      });
    }
  }

  onChange1(time, timeString) {
    this.setState({
      value1: time
    });
    this.triggerChange({value1: time});
  }
  onChange2(time, timeString) {
    this.setState({
      value2: time
    });
    this.triggerChange({value2: time});
  }
  triggerChange(changedValue) {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  render() {
    let {className} = this.props;
    return (
      <span className="time-group">
        <TimePicker onChange={this.onChange1.bind(this)} value={this.state.value1} />
                ~
        <TimePicker onChange={this.onChange2.bind(this)} value={this.state.value2} />
      </span>
    );
  }
}
export default Index;
