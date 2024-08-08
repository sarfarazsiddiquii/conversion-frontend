'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Dropdown from '../../../components/Dropdown';
import styles from './ConversionForm.module.css';

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

  const otherUnits = ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Micrometer', 'Nanometer', 'Mile', 'Yard', 'Foot', 'Inch', 'Light Year'];

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
        router.push(`/${inputNumber}/${inputFromUnit.toLowerCase()}-to-${inputToUnit.toLowerCase()}`, { scroll: false });
      }
    }
  };

  return (
    <div className={styles['converter-form']}>
      <div className={styles.result}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <p>{displayNumber} {displayFromUnit} is equal to {result !== null ? result.toString() : '...'} {displayToUnit}</p>
        )}
      </div>

      <h2>Convert Number to Another Unit</h2>
      <div className={styles['unit-selection']}>
        <div>
          <label>Number</label>
          <input
            type="number"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            className={styles['number-input']}
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
      <button className={styles['convert-button']} onClick={handleConversion} disabled={!inputNumber || !inputFromUnit || !inputToUnit}>
        Convert
      </button>

      <div className={styles['other-conversions']}>
        <h3>Other Conversions for {displayNumber} {displayFromUnit}</h3>
        <ul>
          {otherUnits.map((unit) => (
            unit !== displayToUnit && (
              <li key={unit}>
                <Link href={`/${displayNumber}/${displayFromUnit.toLowerCase()}-to-${unit.toLowerCase()}`}>
                  {displayNumber} {displayFromUnit} to {unit}
                </Link>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
}
