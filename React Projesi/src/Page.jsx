import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const currencies = ["USD", "EUR", "TRY"];
const basecurrencylink = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_oO2a7zG1joAFLfkhFnNSd8g2fMt7TuwM8sauYNaf&base_currency=";

function Page() {
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [currency1, setCurrency1] = useState(currencies[0]);
  const [currency2, setCurrency2] = useState(currencies[1]);

  const handleClick = async () => {
    try {
      const response = await axios.get(basecurrencylink + currency1);
      const result = response.data.data[currency2] * amount1;
      setAmount2(result.toFixed(2));
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="converter-box shadow-lg">
        <h2>💱 Currency Converter</h2>

        <div className="inputs">
          <div className="converter-col">
            <input
              type="number"
              min={0}
              value={amount1}
              onChange={(e) => setAmount1(e.target.value)}
              placeholder="Miktar"
            />
            <select
              value={currency1}
              onChange={(e) => setCurrency1(e.target.value)}
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          </div>

          <div className="converter-col">
            <input
              type="number"
              min={0}
              value={amount2}
              onChange={(e) => setAmount2(e.target.value)}
              placeholder="Sonuç"
              readOnly
            />
            <select
              value={currency2}
              onChange={(e) => setCurrency2(e.target.value)}
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="convert-btn" onClick={handleClick}>
          Dönüştür
        </button>
      </div>
    </div>
  );
}

export default Page;
