import React from 'react';

const AmountInput = ({ amount, onAmountChange }) => (
    <input
        type="number"
        value={amount}
        onChange={onAmountChange}
        className="amountsection border p-2 rounded mb-4"
    />
);

export default AmountInput;
