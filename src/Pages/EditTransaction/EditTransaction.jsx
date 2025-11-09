import React from 'react';
import { useParams } from 'react-router';

const EditTransaction = () => {
    const {id} = useParams()
    return (
        <div>
            edit transaction {id}
        </div>
    );
};

export default EditTransaction;