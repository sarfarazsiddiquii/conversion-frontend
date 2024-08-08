'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Dropdown from '../components/Dropdown';

export default function ConversionPage() {
  const router = useRouter();
  const [number, setNumber] = useState('');
  const [fromUnit, setFromUnit] = useState('centimeter');
  const [toUnit, setToUnit] = useState('inch');

  const handleConversion = () => {
    if (number && fromUnit && toUnit) {
      router.push(`/${number}/${fromUnit.toLowerCase()}-to-${toUnit.toLowerCase()}`);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Cm To Inch</h1>
        <p>Our easy to use calculator allows you to convert centimeters to other units of length, such as inches, meters, and feet.</p>
        <p>Do not want to convert from centimeters? Not a problem. Simply choose another unit of length from the list of drop-down options.</p>
      </header>
      <main className="main-container">
        <div className="converter-form">
          <div className="unit-selection">
            <div>
              <label>Number</label>
              <input 
                type="number" 
                value={number} 
                onChange={(e) => setNumber(e.target.value)} 
                className="number-input" 
              />
            </div>
            <div>
              <label>From</label>
              <Dropdown selectedUnit={fromUnit} setSelectedUnit={setFromUnit} />
            </div>
            <div>
              <label>To</label>
              <Dropdown selectedUnit={toUnit} setSelectedUnit={setToUnit} />
            </div>
          </div>
          <button className="convert-button" onClick={handleConversion} disabled={!number || !fromUnit || !toUnit}>
            Convert
          </button>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Unit Converter. All rights reserved.</p>
      </footer>
    </div>
  );
}