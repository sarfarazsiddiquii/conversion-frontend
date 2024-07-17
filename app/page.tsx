'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const units = ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Micrometer', 'Nanometer', 'Mile', 'Yard', 'Foot', 'Inch', 'Light Year'];

export default function Home() {
  const [number, setNumber] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${number}/${fromUnit.toLowerCase()}-to-${toUnit.toLowerCase()}`);
  };

  return (
    <div>
      <header>
        <h1>Unit Converter</h1>
      </header>
      <main className="container">
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            value={number} 
            onChange={(e) => setNumber(e.target.value)} 
            placeholder="Enter number" 
            required 
          />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} required>
            <option value="">Select original unit</option>
            {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </select>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} required>
            <option value="">Select target unit</option>
            {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </select>
          <button type="submit">Convert</button>
        </form>
      </main>
      <footer>
        <p>&copy; 2024 Unit Converter. All rights reserved.</p>
      </footer>
    </div>
  );
}