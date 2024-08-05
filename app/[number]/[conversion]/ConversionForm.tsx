'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Dropdown from '../../../components/Dropdown';

interface ConversionFormProps {
  initialNumber: string;
  initialFromUnit: string;
  initialToUnit: string;
  initialResult: number | null;
}

async function getConversionResult(number: string, fromUnit: string, toUnit: string) {
  try {
    const response = await fetch(`https://test.cm-inch.com/api/convert?value=${number}&from=${fromUnit}&to=${toUnit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { result: data.result, error: null };
  } catch (error) {
    return { result: null, error: 'Failed to fetch conversion result' };
  }
}

export default function ConversionForm({ initialNumber, initialFromUnit, initialToUnit, initialResult }: ConversionFormProps) {
  const router = useRouter();
  const [number, setNumber] = useState(initialNumber);
  const [fromUnit, setFromUnit] = useState(initialFromUnit);
  const [toUnit, setToUnit] = useState(initialToUnit);
  const [result, setResult] = useState<number | null>(initialResult);
  const [error, setError] = useState<string | null>(null);

  const handleConversion = async () => {
    if (number && fromUnit && toUnit) {
      const { result, error } = await getConversionResult(number, fromUnit, toUnit);
      if (error) {
        setError(error);
      } else {
        setResult(result);
        setError(null);
        // Update URL without adding query parameters
        router.push(`/${number}/${fromUnit.toLowerCase()}-to-${toUnit.toLowerCase()}`, { scroll: false });
      }
    }
  };

  return (
    <div className="converter-form">
      <div className="result">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <p>{number} {fromUnit} is equal to {result !== null ? result.toString() : '...'} {toUnit}</p>
        )}
      </div>

      <h2>Convert Number to Another Unit</h2>
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
  );
}