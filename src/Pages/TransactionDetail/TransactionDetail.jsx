import React from 'react';
import { useParams } from 'react-router';

const TransactionDetail = () => {
    const {id} = useParams()
    return (
        <div>
            Transaction detail {id}
        </div>
    );
};

export default TransactionDetail;