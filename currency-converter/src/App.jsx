import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import './output.css';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConversionResult from './components/ConversionResult';
import axios from 'axios';

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state


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

    // Swap currencies
    const swapCurrencies = () => {
        const tempCurrency = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(tempCurrency);
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

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    // Load theme from local storage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    return (
         <div className={isDarkMode ? 'dark' : ''}>
        <div className="container mx-auto p-4">
            <h1 className="title text-2xl font-bold mb-4">Currency Converter</h1>
            <button 
                onClick={toggleDarkMode} 
                className={`p-2 mb-4 border ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
            >
                <img 
                    src="src/components/9071075_dark_mode_icon.svg" 
                    alt="Swap Icon" 
                    className="swapicon inline-block h-4 w-6"
                />
            </button>
            {error && <div className="text-red-500">{error}</div>}
            <CurrencySelector currencies={currencies} selectedCurrency={fromCurrency} onCurrencyChange={setFromCurrency} label="From" />

            {/* Swap Button with Icon */}
            <div className="text-center my-4">
                <button 
                    onClick={swapCurrencies} 
                    className="btn bg-blue-white hover:bg-white-700 font-bold py-2 px-4"
                >
                    <img 
                        src="https://img.icons8.com/?size=100&id=45026&format=png&color=ffffff" 
                        alt="Swap Icon" 
                        className="swapicon inline-block h-4 w-6"
                    />
                </button>
            </div>

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
              </div>
    );
}

export default App;
