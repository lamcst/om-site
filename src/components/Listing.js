import React, { useEffect } from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import { getOrderAll, stopOrderAll } from '../store/actions/order';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from '@reach/router';
const { Column } = Table;

const ORDER_STATUS = {
  CRE: { color: null, val: 'CREATED' },
  CON: { color: 'orange', val: 'CONFIRMED' },
  CAN: { color: 'red', val: 'CANCELLED' },
  DEL: { color: 'green', val: 'DELIVERED' },
};
function Listing({ getOrderAll, order, stopOrderAll }) {
  useEffect(() => {
    getOrderAll();
    return () => {
      stopOrderAll();
    };
  }, [getOrderAll, stopOrderAll]);
  const successOrder = async () => {
    await stopOrderAll();
    await fetch(`${process.env.REACT_APP_API_SERVICE}/orders/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pin: '123456' }),
    });
    await getOrderAll();
  };
  const failOrder = async () => {
    await stopOrderAll();
    await fetch(`${process.env.REACT_APP_API_SERVICE}/orders/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pin: '12345' }),
    });
    await getOrderAll();
  };
  const handleCancel = async (key) => {
    await stopOrderAll();
    await fetch(`${process.env.REACT_APP_API_SERVICE}/orders/cancel/${key}`, {
      method: 'PUT',
    });
    await getOrderAll();
  };

  const renderStatus = (statusEnum) => (
    <Tag
      color={ORDER_STATUS[statusEnum].color}
      key={ORDER_STATUS[statusEnum].val}
    >
      {ORDER_STATUS[statusEnum].val}
    </Tag>
  );
  return (
    <>
      <Space style={{ margin: 16 }}>
        <Button onClick={successOrder} type="primary">
          Add Success Order
        </Button>
        <Button onClick={failOrder} type="primary" danger>
          Add Fail Order
        </Button>
      </Space>
      <Table dataSource={order.payload} rowKey="id">
        <Column title="Id" dataIndex="id" key="id" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={renderStatus}
        />
        <Column
          title="Create Date Time"
          dataIndex="createTime"
          key="createTime"
        />
        <Column
          title=""
          key="cancel"
          render={(text, record) =>
            order.payload.length >= 1 && record.status !== 'CAN' ? (
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={async () => await handleCancel(record.id)}
              >
                <Button danger>cancel</Button>
              </Popconfirm>
            ) : null
          }
        />
        <Column
          title=""
          key="detail"
          render={(text, record) =>
            order.payload.length >= 1 ? (
              <Link to={`order/${record.id}`}>detail</Link>
            ) : null
          }
        />
      </Table>
    </>
  );
}
function mapStateToProps(state) {
  return { order: state.order };
}

Listing.propTypes = {
  order: PropTypes.exact({
    invalidate: PropTypes.bool,
    isLoading: PropTypes.bool,
    payload: PropTypes.array,
  }),
  getOrderAll: PropTypes.func,
  stopOrderAll: PropTypes.func,
};
export default connect(mapStateToProps, { getOrderAll, stopOrderAll })(Listing);
