import React from 'react';
import PropTypes from 'prop-types';
import {Table, Modal} from 'antd';
import {Link} from 'react-router-dom';
import {DropOption} from 'components';
import classnames from 'classnames';
import queryString from 'query-string';
import AnimTableBody from 'components/DataTable/AnimTableBody';
import styles from './MyTable.less';

const confirm = Modal.confirm;

const MyTable = ({tableId, columnsConfig, isMotion, selectedRowKeys, location, loading, dispatch, namespace, onChange, ...tableProps}) => {
  location.query = queryString.parse(location.search);


  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current
  };

  const handleMenu = {};


  onChange = onChange || ((pagination, filters, sorter) => {
    dispatch({
      type: `${namespace}/query`,
      payload: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
        tableId
      }
    });
  });

  const onDeleteItem = (id) => {
    dispatch({
      type: `${namespace}/delete`,
      payload: {
        id,
        tableId,
        pagination: tableProps.pagination
      }
    });
  };

  const onEditItem = (item) => {
    dispatch({
      type: `${namespace}/showModal`,
      payload: {
        modalType: 'edit',
        editingItem: {
          data: item,
          tableId,
          pagination: tableProps.pagination
        }
      }
    });
  };

  const handleMenuClick = (record, e) => {
    if (e.key === 'edit') {
      onEditItem(record);
    } else if (e.key === 'delete') {
      confirm({
        title: '删除这条记录吗？',
        onOk() {
          onDeleteItem(record.id);
        }
      });
    } else {
      handleMenu[e.key](record);
    }
  };

  const columns = columnsConfig.map((item) => {
    item.dataIndex = item.key;
    if (item.type === 'operation') {
      const menuOptions = [];
      item.operations.forEach((operation) => {
        if (operation.key === 'edit') {
          menuOptions.push({key: 'edit', name: '编辑'});
        } else if (operation.key === 'delete') {
          menuOptions.push({key: 'delete', name: '删除'});
        } else {
          menuOptions.push({key: operation.key, name: operation.name});
          handleMenu[operation.key] = operation.handler;
        }
      });
      item.render = (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={menuOptions} />;
      };
    }
    return item;
  });

  const handleRowClick = (record) => {
    const keys = selectedRowKeys[tableId];

    if (keys.indexOf(record.id) > -1) {
      keys.splice(keys.indexOf(record.id), 1);
    } else {
      keys.push(record.id);
    }

    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        selectedRowKeys: {
          ...selectedRowKeys,
          [tableId]: keys
        }
      }
    });
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys[tableId],
    onChange: (keys) => {
      dispatch({
        type: `${namespace}/updateState`,
        payload: {
          selectedRowKeys: {
            ...selectedRowKeys,
            [tableId]: keys
          }
        }
      });
    }
  };


  // const getBodyWrapper = (body) => {return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body;};
  return (
    <div>
      <Table
        onRow={(record) => {
          return {
            onClick: () => {handleRowClick()} // 点击行
          };
        }}
        {...tableProps}
        className={classnames({[styles.table]: true, [styles.motion]: isMotion, ['tableWeight']: true})}
        bordered
        scroll={{x: true}}
        columns={columns}
        rowSelection={tableProps.batchOperation ? rowSelection : null}
        loading={loading.effects[`${namespace}/query`]}
        simple
        rowKey={record => record.id}
        onChange={onChange}
        size="small"
      />
    </div>
  );
};

MyTable.propTypes = {
  tableId: PropTypes.string,
  columnsConfig: PropTypes.array,
  selectedRowKeys: PropTypes.object,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  namespace: PropTypes.string,
  loading: PropTypes.object
};

export default MyTable;
