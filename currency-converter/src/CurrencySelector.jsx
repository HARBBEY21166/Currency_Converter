import React from 'react';

const CurrencySelector = ({ currencies, selectedCurrency, onCurrencyChange, label }) => {
    return (
        <div className="selectorsec">
            <div className="formgroup">
            <label className="block text-sm font-medium text-gray-700">{label} Currency</label>
            <select
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="currencyinput mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
                <option value="">Select a currency</option>
                {currencies.map(([code, name]) => (
                    <option key={code} value={code}>
                        {`${code} - ${name}`}
                    </option>
                ))}
            </select>
            </div>
        </div>
    );
};

export default CurrencySelector;
