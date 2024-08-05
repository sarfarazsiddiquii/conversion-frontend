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
  const [inputNumber, setInputNumber] = useState(initialNumber);
  const [inputFromUnit, setInputFromUnit] = useState(initialFromUnit);
  const [inputToUnit, setInputToUnit] = useState(initialToUnit);
  
  const [displayNumber, setDisplayNumber] = useState(initialNumber);
  const [displayFromUnit, setDisplayFromUnit] = useState(initialFromUnit);
  const [displayToUnit, setDisplayToUnit] = useState(initialToUnit);
  const [result, setResult] = useState<number | null>(initialResult);
  const [error, setError] = useState<string | null>(null);

  const handleConversion = async () => {
    if (inputNumber && inputFromUnit && inputToUnit) {
      const { result, error } = await getConversionResult(inputNumber, inputFromUnit, inputToUnit);
      if (error) {
        setError(error);
      } else {
        setResult(result);
        setError(null);
        setDisplayNumber(inputNumber);
        setDisplayFromUnit(inputFromUnit);
        setDisplayToUnit(inputToUnit);
        // Update URL without adding query parameters
        router.push(`/${inputNumber}/${inputFromUnit.toLowerCase()}-to-${inputToUnit.toLowerCase()}`, { scroll: false });
      }
    }
  };

  return (
    <div className="converter-form">
      <div className="result">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <p>{displayNumber} {displayFromUnit} is equal to {result !== null ? result.toString() : '...'} {displayToUnit}</p>
        )}
      </div>

      <h2>Convert Number to Another Unit</h2>
      <div className="unit-selection">
        <div>
          <label>Number</label>
          <input
            type="number"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            className="number-input"
          />
        </div>
        <div>
          <label>From</label>
          <Dropdown selectedUnit={inputFromUnit} setSelectedUnit={setInputFromUnit} />
        </div>
        <div>
          <label>To</label>
          <Dropdown selectedUnit={inputToUnit} setSelectedUnit={setInputToUnit} />
        </div>
      </div>
      <button className="convert-button" onClick={handleConversion} disabled={!inputNumber || !inputFromUnit || !inputToUnit}>
        Convert
      </button>
    </div>
  );
}