import { Link } from '@reach/router';
import React, { useEffect } from 'react';
import { Card, Descriptions } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrderAll, stopOrderAll } from '../store/actions/order';

export function Detail({ getOrderAll, order, stopOrderAll, id }) {
  useEffect(() => {
    getOrderAll();
    return () => {
      stopOrderAll();
    };
  }, [getOrderAll, stopOrderAll]);
  const singleOrder = order.payload.find((p) => p.id === id);
  if (order.isLoading) {
    return <p>Loading...</p>;
  }
  if (!singleOrder && !order.payload.length) {
    return <p>Not found</p>;
  }
  if (!singleOrder) {
    return <p>Invalid Id</p>;
  }
  return (
    <Card title="Order" extra={<Link to="/">Back</Link>} style={{ width: 600 }}>
      <Descriptions>
        <Descriptions.Item label="ID" span={3}>
          {singleOrder.id}
        </Descriptions.Item>
        <Descriptions.Item label="STATUS" span={3}>
          {singleOrder.status}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
function mapStateToProps(state) {
  return { order: state.order };
}
Detail.propTypes = {
  order: PropTypes.exact({
    invalidate: PropTypes.bool,
    isLoading: PropTypes.bool,
    payload: PropTypes.array,
  }),
  id: PropTypes.string,
  getOrderAll: PropTypes.func,
  stopOrderAll: PropTypes.func,
};
export default connect(mapStateToProps, { getOrderAll, stopOrderAll })(Detail);
