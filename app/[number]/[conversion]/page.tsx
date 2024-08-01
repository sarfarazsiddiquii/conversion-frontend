'use client'

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from '../../../components/Dropdown';

export default function ConversionResult() {
  const params = useParams();
  const router = useRouter();
  const { number, conversion } = params as { number: string, conversion: string };
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newUnit, setNewUnit] = useState<string>('');

  const [fromUnit, toUnit] = conversion ? conversion.split('-to-') : ['', ''];

  useEffect(() => {
    fetchResult(number, fromUnit, toUnit);
  }, [number, fromUnit, toUnit]);

  const fetchResult = async (value: string, from: string, to: string) => {
    if (!value || !from || !to) return;

    try {
      const response = await fetch(`https://test.cm-inch.com/api/convert?value=${value}&from=${from}&to=${to}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setError('Failed to fetch conversion result');
      console.error('Error:', error);
    }
  };

  const handleNewConversion = () => {
    if (newUnit) {
      router.push(`/number/${number}/${fromUnit}-to-${newUnit}`);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Conversion Result</h1>
      </header>
      <main className="main-container">
        <div className="converter-form">
          <div className="result">
            {error ? (
              <p className="error">{error}</p>
            ) : result === null ? (
              <p>Loading...</p>
            ) : (
              <p>{number} {fromUnit} is equal to {result} {toUnit}</p>
            )}
          </div>
          <div className="new-conversion">
            <h2>Convert to another unit:</h2>
            <Dropdown selectedUnit={newUnit} setSelectedUnit={setNewUnit} />
            <button className="convert-button" onClick={handleNewConversion} disabled={!newUnit}>
              Convert
            </button>
          </div>
          <Link href="/">
            <button className="back-button">Back to Converter</button>
          </Link>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Unit Converter. All rights reserved.</p>
      </footer>
    </div>
  );
}