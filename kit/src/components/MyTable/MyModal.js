import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Modal} from 'antd';
import MyInput from '../MyInput/MyInput';

const modal = ({
  item = {},
  inputConfig,
  editingItem,
  loading,
  dispatch,
  namespace,
  modalType,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        key: item.key
      };
      dispatch({
        type: `${namespace}/update`,
        payload: {
          modalType,
          id: item.id,
          data,
          tableId: editingItem.tableId,
          pagination: editingItem.pagination
        }
      });
    });
  };

  const handleCancel = () => {
    dispatch({
      type: `${namespace}/hideModal`
    });
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        editingItem: {
          tableId: '',
          pagination: {}
        }
      }
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
    onCancel: handleCancel,
    confirmLoading: loading.effects['zhangfanTest/update'],
    wrapClassName: 'vertical-center-modal',
    maskClosable: false
  };

  const formItemList = [];
  inputConfig.forEach((item, index) => {
    formItemList.push(
      <Col span={24} key={index}>
        <MyInput data={item} form={{getFieldDecorator}} dispatch={dispatch} namespace={namespace} />
      </Col>,
    );
  });
  return (
    <Modal {...modalOpts}>
      <Form layout="vertical">
        <Row gutter={40}>
          {formItemList}
        </Row>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  inputConfig: PropTypes.array,
  editingItem: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
  namespace: PropTypes.string,
  modalType: PropTypes.string,
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
};

export default Form.create()(modal);
