/**
 * 复选框组件
 */
import React, {Component} from 'react';
import {Form, Row, Col, Input, Button, Icon, DatePicker, Select, InputNumber, Radio, Cascader, Checkbox} from 'antd';
import classnames from 'classnames';
import './Checkbox.less';

const CheckboxGroup = Checkbox.Group;
class Index extends Component {
  constructor(props) {
    super(props);
    let value = this.props.data.value || this.props.data.defaultValue || []
    this.state = {
      checkAll: false,
      checkedList: value
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      let value = nextProps.value;
      let checkAll = false;
      if (typeof value == 'object' && !(value instanceof Array)) {
        value = value.checkedList
      }
      if (!!value && value.length == this.props.data.options.length) {
        checkAll = true;
      }
      this.setState({
        checkedList: value,
        checkAll: checkAll
      });
    }
  }
  onCheckAllChange(e) {
    let options = this.props.data.options;
    let newCheckedList = [];
    options.forEach((item, index) => {
      newCheckedList.push(item.value)
    })
    let checkedList = e.target.checked ? newCheckedList : [];
    let checkAll = e.target.checked;
    this.setState({
      checkedList,
      checkAll
    });
    this.triggerChange({checkedList, checkAll})
  }
  onChange = (checkedList) => {
    let checkAll = checkedList.length === this.props.data.options.length;
    this.setState({
      checkedList,
      checkAll
    });
    this.triggerChange({checkedList, checkAll})
  }
  triggerChange(changedValue) {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  render() {
    const {data} = this.props;
    return (
      <div>
        <CheckboxGroup disabled={data.readOnly || false} options={this.props.data.options} value={this.state.checkedList} onChange={this.onChange.bind(this)} />
        <Checkbox
          onChange={this.onCheckAllChange.bind(this)}
          checked={this.state.checkAll}
          disabled={data.readOnly || false}
        >
          全选
        </Checkbox>
      </div>
    );
  }
}
export default Index;
