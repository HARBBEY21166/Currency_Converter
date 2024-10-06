import React from 'react';

const ConversionResult = ({ amount, fromCurrency, convertedAmount, toCurrency, exchangeRate }) => (
    <div className="mt-4">
        <div>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
        </div>
        {exchangeRate && (
            <div className="mt-2 text-gray-600">
                Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </div>
        )}
    </div>
);

export default ConversionResult;
