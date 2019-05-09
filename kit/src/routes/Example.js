import React, {Component} from 'react'
import {connect} from 'dva'
import {DynamicArrayInput} from 'components'
import {Row, Col, Button, Modal, Form, Card, Select, Tabs, Spin, message, Tag} from 'antd';

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const {example} = this.props
    const {title, content} = example
    return (
      <div>
        <DynamicArrayInput form={this.props.form} dispatch={this.props.dispatch}></DynamicArrayInput>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    example: state.example
  }
}
export default connect(mapStateToProps)(Form.create({})(Example))
