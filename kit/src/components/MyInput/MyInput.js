/**
 * 表单项组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Form, Row, Col, Input, Button, Tooltip, Icon, DatePicker, Select, InputNumber, Radio, Cascader, Checkbox, Transfer, Switch} from 'antd';
import Amount from '../Amount/Amount';
import TimeRange from '../TimeRange/TimeRange';
import AmountRange from '../AmountRange/AmountRange';
import CheckboxAll from '../Checkbox/Checkbox';
import InputPhone from '../InputPhone/Index';
import Image from '../Image/Image';
import './MyInput.less';

const {MonthPicker, RangePicker} = DatePicker;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;


class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.reporter = this.props.data.reporter || '';
    this.state = {
      value: [],
      targetKeys: this.props.data.value || this.props.data.defaultValue || [] // 仅transfer组件使用
    };
  }
  componentWillReceiveProps(nextProps) {
  }
  componentDidMount() {
  }
  onChange(e, extra) {
    const {dispatch, namespace} = this.props;
    const name = this.props.data.name;
    const reporter = this.reporter;
    let value = null;
    switch (this.props.data.type) {
      case 'text': case 'radio': case 'email': case 'password': case 'textarea': case 'cascader':
        value = e.target.value;
        break;
      case 'dateRange':
        value = extra;
        break;
      case 'amount':
        value = e.value;
        break;
      case 'amountRange':
        value = [e.value1, e.value2];
        break;
      case 'checkbox':
        value = e.checkedList;
        break;
      case 'transfer':
        value = e;
        break;
      default:
        value = e;
        break;
    }
    dispatch({
      type: `${namespace}/onInputChange`,
      payload: {
        name,
        value,
        reporter
      }
    });
  }
  renderInput(data) {
    let inputDom;
    const {getFieldDecorator, setFieldsValue} = this.props.form;
    const {dispatch, namespace} = this.props;
    const formItemLayout = this.formItemLayout;
    switch (data.type) {
      case 'image':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>

            <Image data={data} />

          </FormItem>
        ;
        break;
      case 'dateOnly':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                rules: [{required: data.required, message: `${data.text}不能为空`}],
                initialValue: data.value || data.defaultValue
              })(
                <DatePicker format="YYYY-MM-DD" onChange={this.onChange.bind(this)} />,
              )
            }
          </FormItem>
        ;
        break;
      case 'dateRange':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                rules: [{type: 'array', required: data.required, message: `${data.text}不能为空`}],
                initialValue: data.value || data.defaultValue
              })(
                <RangePicker getCalendarContainer={() => document.getElementById('mainContent')} format="YYYY-MM-DD" onChange={this.onChange.bind(this)} />,
              )
            }
          </FormItem>
        ;
        break;
      case 'email':
        inputDom =
          <FormItem hasFeedback {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || data.defaultValue,
                rules: [
                  {required: data.required, message: `${data.text}不能为空`},
                  {type: 'email', message: '邮箱格式不正确'}
                ]
              })(
                <Input placeholder={data.text} onChange={this.onChange.bind(this)} disabled={data.readOnly || false} />,
              )
            }
          </FormItem>
        ;
        break;
      case 'number':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value === 0 ? 0 : data.value || data.defaultValue,
                rules: [
                  {required: data.required, message: `${data.text}不能为空`},
                  {pattern: data.pattern ? new RegExp(data.pattern) : /^.*$/, message: data.patternMsg ? data.patternMsg : `填写的内容需符合正则表达式：${data.pattern}`}
                ]
              })(
                <InputNumber formatter={data.formatter} parser={data.parser} min={data.minValue} step={0} max={data.maxValue} onChange={this.onChange.bind(this)} />,
              )
            }
          </FormItem>
        ;
        break;
      case 'text':
        inputDom =
          <FormItem hasFeedback={!data.hasFeedback} {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || data.defaultValue,
                rules: [
                  {required: data.required, message: `${data.text}不能为空`},
                  {pattern: data.pattern ? new RegExp(data.pattern) : /^.*$/, message: data.patternMsg ? data.patternMsg : `填写的内容需符合正则表达式：${data.pattern}`},
                  {validator: data.validateFunc}
                ]
              })(
                <Input placeholder={this.props.placeholder || data.text} data-reporter={data.reporter} onChange={this.onChange.bind(this)} disabled={data.readOnly || false} addonAfter={data.addonAfter ? data.addonAfter : null} />,
              )
            }
          </FormItem>
        ;
        break;
      case 'password':
        inputDom =
          <FormItem hasFeedback {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || data.defaultValue,
                rules: [
                  {required: data.required, message: `${data.text}不能为空`},
                  {validator: data.validateFunc}
                ]
              })(
                <Input placeholder={data.text} type="password" onChange={this.onChange.bind(this)} />,
              )
            }
          </FormItem>
        ;
        break;
      case 'textarea':
        inputDom =
          <FormItem hasFeedback {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || data.defaultValue,
                rules: [
                  {required: data.required, message: `${data.text}不能为空`},
                  {validator: data.validateFunc}
                ]
              })(
                <Input
                  placeholder={data.text}
                  type="textarea"
                  autosize={{minRows: data.minRows || 2, maxRows: data.maxRows || 6}}
                  onChange={this.onChange.bind(this)}
                  disabled={data.readOnly || false}
                />,
              )
            }
          </FormItem>
        ;
        break;
      case 'select':
        let result = data.options.filter((item, index) => {
          return item.label == '--请选择--';
        })
        result.length <= 0 && data.options.unshift({
          label: '--请选择--',
          value: undefined
        })
        inputDom =
          <FormItem hasFeedback {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: !!data.value || data.value === 0 ? String(data.value) : data.value,
                rules: [
                  {required: data.required, message: `请选择${data.text}`}
                ]
              })(
                <Select disabled={data.readOnly || false} key={data.value} allowClear getPopupContainer={() => document.getElementById('mainContent')} multiple={data.multiple} placeholder="--请选择--" onChange={this.onChange.bind(this)} data-reporter={data.reporter}>
                  {
                    data.options.map((item, index) => {
                      if (typeof item.value === 'number') {
                        item.value = String(item.value);
                      }
                      return <Option value={item.value} key={data.name + index}>{item.label}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        ;
        break;
      case 'radio':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || data.defaultValue,
                rules: [
                  {required: data.required, message: `请选择${data.text}`}
                ]
              })(
                <RadioGroup onChange={this.onChange.bind(this)}>
                  {
                    data.options.map((item, index) => {
                      if (typeof item === 'object') {
                        return <Radio value={item.value} key={index} disabled={data.readOnly || false}>{item.label}</Radio>;
                      }
                      return <Radio value={item} key={index} disabled={data.readOnly || false}>{item}</Radio>;
                    })
                  }
                </RadioGroup>,
              )
            }
          </FormItem>
        ;
        break;
      case 'switch':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || false,
                valuePropName: 'checked'
              })(
                <Switch checkedChildren={data.checked || ''} unCheckedChildren={data.unchecked || ''} onChange={this.onChange.bind(this)} disabled={data.readOnly || false} />
              )
            }
          </FormItem>
        ;
        break;
      case 'checkbox':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || data.defaultValue,
                rules: [{required: data.required, message: `${data.text}不能为空`}]
              })(
                <CheckboxAll
                  {...this.props}
                  data={data}
                  onChange={this.onChange.bind(this)}
                />,
              )
            }
          </FormItem>
        ;
        break;
      case 'cascader':
        inputDom =
          <FormItem hasFeedback {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || data.defaultValue,
                rules: [{type: 'array', required: data.required, message: `${data.text}不能为空`}]
              })(
                <Cascader options={data.options} placeholder="Please select" onChange={this.onChange.bind(this)} />,
              )
            }
          </FormItem>
        ;
        break;
      case 'amount':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || data.defaultValue,
                rules: [
                  {required: data.required, message: `${data.text}不能为空`}
                ],
                normalize: (value) => {return typeof value === 'object' ? value.value : value;}
              })(
                <Amount
                  {...this.props}
                  data={data}
                  onChange={this.onChange.bind(this)}
                />,
              )
            }
          </FormItem>
        ;
        break;
      case 'timeRange':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name)(
                <TimeRange
                  {...this.props}
                  data={data}
                  onChange={this.onChange.bind(this)}
                />,
              )
            }
          </FormItem>
        ;
        break;
      case 'amountRange':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                rules: [
                  {required: data.required, message: `${data.text}不能为空`}
                ]
              })(
                <AmountRange
                  {...this.props}
                  data={data}
                  onChange={this.onChange.bind(this)}
                />,
              )
            }
          </FormItem>
        ;
        break;
      case 'transfer':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                valuePropName: 'targetKeys',
                initialValue: data.value || data.defaultValue,
                rules: [
                  {required: data.required, message: `${data.text}不能为空`}
                ]
              })(
                <Transfer
                  {...this.props}
                  dataSource={data.options.map((option, index) => {
                    return {
                      key: index,
                      title: option.label,
                      description: option.label,
                      disabled: data.readOnly
                    };
                  })}
                  listStyle={{width: 350}}
                  showSearch
                  titles={data.titles || ['请选择', '已选']}
                  filterOption={(inputValue, option) => {return option.description.indexOf(inputValue) > -1;}}
                  selectedKeys={this.state.selectedKeys}
                  onChange={this.onChange.bind(this)}
                  render={item => item.title}
                  onSelectChange={((sourceSelectedKeys, targetSelectedKeys) => {
                    let self = this;
                    let targetKeys = this.props.data.value;
                    // 如果双击转移item
                    if (this.dbclick) {
                      let chengeItem = null;
                      if (self.sourceSelectedKeys.length > sourceSelectedKeys.length) {
                        chengeItem = self.sourceSelectedKeys.filter((i) => {return sourceSelectedKeys.indexOf(i) === -1})[0];
                        targetKeys.unshift(chengeItem);
                      } else if (self.sourceSelectedKeys.length < sourceSelectedKeys.length) {
                        chengeItem = sourceSelectedKeys.filter((i) => {return self.sourceSelectedKeys.indexOf(i) === -1})[0];
                        targetKeys.unshift(chengeItem);
                      } else if (self.targetSelectedKeys.length > targetSelectedKeys.length) {
                        chengeItem = self.targetSelectedKeys.filter((i) => {return targetSelectedKeys.indexOf(i) === -1})[0];
                        targetKeys.splice(targetKeys.indexOf(chengeItem), 1);
                      } else if (self.targetSelectedKeys.length < targetSelectedKeys.length) {
                        chengeItem = targetSelectedKeys.filter((i) => {return self.targetSelectedKeys.indexOf(i) === -1})[0];
                        targetKeys.splice(targetKeys.indexOf(chengeItem), 1);
                      }
                    }
                    //每次点击进行是否双击的判断  
                    this.dbclick = true;
                    this.sourceSelectedKeys = sourceSelectedKeys;
                    this.targetSelectedKeys = targetSelectedKeys;
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                      self.dbclick = false;
                      self.sourceSelectedKeys = undefined;
                      self.targetSelectedKeys = undefined;
                    }, 300);
                    // 设置选中项state
                    this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});
                  }).bind(this)}
                />,
              )
            }
          </FormItem>
        ;
        break;
      case 'inputPhone':
        inputDom =
          <FormItem {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || data.defaultValue,
                rules: [
                  {required: data.required, message: `${data.text}不能为空`}
                ],
                normalize: (value) => {return typeof value === 'object' ? value.value : value;}
              })(
                <InputPhone
                  {...this.props}
                  data={data}
                  onChange={this.onChange.bind(this)}
                />,
              )
            }
          </FormItem>
        ;
        break;
      default:
        inputDom =
          <FormItem hasFeedback {...formItemLayout} label={(
            <span>
              {data.description && <span><Tooltip title={data.description}>
                <Icon type="question-circle-o" style={{color: '#1890ff'}} />
              </Tooltip>&nbsp;</span>}
              {data.text}
            </span>
          )}>
            {
              getFieldDecorator(data.name, {
                initialValue: data.value || data.defaultValue,
                rules: [
                  {required: data.required, message: `${data.text}不能为空`},
                  {validator: data.validateFunc}
                ]
              })(
                <Input placeholder={data.text} data-reporter={data.reporter} onChange={this.onChange.bind(this)} />,
              )
            }
          </FormItem>
        ;
        break;
    }
    return inputDom;
  }
  render() {
    const {data} = this.props;
    this.formItemLayout = window.isWidescreen ? {
      labelCol: {span: 8},
      wrapperCol: {span: 16}
    } : null;
    return this.renderInput(data);
  }
}

MyInput.propTypes = {
  data: PropTypes.object
};

export default MyInput;
