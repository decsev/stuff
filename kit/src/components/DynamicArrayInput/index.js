import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Form, Row, Col, Input, Button, Tooltip, Icon, DatePicker, Select, InputNumber, Radio, Cascader, Checkbox, Transfer, Switch} from 'antd';
import {MyInput} from 'components';
import styles from './index.less';
import {deepClone} from 'utils';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.value.length,
      tData: this.props.data
    };
  }
  componentDidMount() {

  }
  componentDidUpdate() {
    // const len = this.props.data.value.length;
  }
  remove = (k) => {
    const {form} = this.props;
    const keys = form.getFieldValue(this.state.tData.name);
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      [this.state.tData.name]: keys.filter(key => key !== k)
    });
  }

  add = () => {
    const {form} = this.props;
    const keys = form.getFieldValue(this.state.tData.name);
    const nextId = this.state.id + 1;
    const nextKeys = keys.concat(nextId);
    this.setState({id: nextId});
    form.setFieldsValue({
      [this.state.tData.name]: nextKeys
    });
  }
  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const {form, dispatch} = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20}
      }
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {span: 12, offset: 0},
        sm: {span: 10, offset: 2}
      }
    };
    const len = this.props.data.value.length;
    let myInitialValue = [];
    for (let i = 0; i < len; i++) {
      myInitialValue.push(i);
    }
    getFieldDecorator(this.state.tData.name, {initialValue: myInitialValue});
    const keys = getFieldValue(this.state.tData.name);
    const inputValues = this.props.data.value;
    const formItems = keys.map((k, index) => {
      return (
        <div key={index} className={styles.arrayInputContain}>
          <Row>
            {
              (this.state.tData.form || []).map((o, index) => {
                const item = deepClone(o);
                item.name = `${item.name}[${k}]`;
                item.value = (inputValues[k] || {})[o.name] || undefined;
                return <Col sm={item.col || 24} md={item.col || 12} key={item.name}>
                  <MyInput data={item} form={form} dispatch={dispatch} />
                </Col>
              })
            }
          </Row>
          <Icon
            className={styles.dynamic_delete_button}
            type="close"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </div>
      )
    });
    return (
      <div>
        <div className={styles.arrayTitle}>{this.state.tData.title}：</div>
        {formItems}
        <div className={styles.addButtonContain}>
          <Button type="dashed" onClick={() => {this.add()}} block>
            <Icon type="plus" /> 增加
          </Button>
        </div>
      </div>
    );
  }
}

export default index;