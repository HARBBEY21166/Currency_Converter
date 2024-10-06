import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import './output.css';
import CurrencySelector from './CurrencySelector';
import AmountInput from './AmountInput';
import ConversionResult from './ConversionResult';

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [error, setError] = useState(null);

    // Fetch currencies
    const fetchCurrencies = async () => {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/3f358bf8caef8ed8b231a83d/codes`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCurrencies(data.supported_codes);
        } catch (error) {
            setError('Failed to fetch currencies. Please try again later.');
        }
    };

    // Convert currency
    const convertCurrency = async () => {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/3f358bf8caef8ed8b231a83d/latest/${fromCurrency}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const rate = data.conversion_rates[toCurrency];
            setExchangeRate(rate);
            setConvertedAmount(amount * rate);
            setError(null); // Reset error on successful fetch
        } catch (error) {
            setError('Failed to convert currency. Please try again later.');
        }
    };

    // Fetch currencies on component mount
    useEffect(() => {
        fetchCurrencies();
    }, []);

    // Handle currency conversion when input changes
    useEffect(() => {
        if (fromCurrency && toCurrency) {
            convertCurrency();
        }
    }, [fromCurrency, toCurrency, amount]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
            {error && <div className="text-red-500">{error}</div>}
            <CurrencySelector currencies={currencies} selectedCurrency={fromCurrency} onCurrencyChange={setFromCurrency} label="From" />
            <CurrencySelector currencies={currencies} selectedCurrency={toCurrency} onCurrencyChange={setToCurrency} label="To" />
            <AmountInput amount={amount} onAmountChange={(e) => setAmount(e.target.value)} />
            <ConversionResult 
                amount={amount} 
                fromCurrency={fromCurrency} 
                convertedAmount={convertedAmount} 
                toCurrency={toCurrency} 
                exchangeRate={exchangeRate} 
            />
        </div>
    );
}

export default App;
