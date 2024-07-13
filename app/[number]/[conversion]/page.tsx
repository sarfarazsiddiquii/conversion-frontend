'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ConversionResult() {
  const params = useParams();
  const { number, conversion } = params as { number: string, conversion: string };

  const convertUnits = (num: string, from: string, to: string) => {
    // This is a placeholder. You'll need to implement the actual conversion logic.
    return `${num} ${from} is equal to X ${to}`;
  };

  if (number && conversion && typeof conversion === 'string') {
    const [fromUnit, toUnit] = conversion.split('-to-');
    const result = convertUnits(number as string, fromUnit, toUnit);

    return (
      <div>
        <h1>Conversion Result</h1>
        <p>{result}</p>
        <Link href="/">Back to Converter</Link>
      </div>
    );
  }

  return <div>Loading...</div>;
}