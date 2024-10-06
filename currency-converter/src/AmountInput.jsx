import React from 'react';

const AmountInput = ({ amount, onAmountChange }) => (
    <input
        type="number"
        value={amount}
        onChange={onAmountChange}
        className="border p-2 rounded mb-4"
    />
);

export default AmountInput;
