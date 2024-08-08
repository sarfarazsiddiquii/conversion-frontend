import ConversionForm from './ConversionForm';
import Link from 'next/link';
import styles from './ConversionForm.module.css';

interface ConversionResultProps {
  params: {
    number: string;
    conversion: string;
  };
}

async function getConversionResult(number: string, fromUnit: string, toUnit: string) {
  try {
    const response = await fetch(`https://test.cm-inch.com/api/convert?value=${number}&from=${fromUnit}&to=${toUnit}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { result: data.result, error: null };
  } catch (error) {
    return { result: null, error: 'Failed to fetch conversion result' };
  }
}

export default async function ConversionResult({ params }: ConversionResultProps) {
  const { number, conversion } = params;
  const [fromUnit, toUnit] = conversion ? conversion.split('-to-') : ['', ''];
  const { result, error } = await getConversionResult(number, fromUnit, toUnit);

  return (
    <div className="app-container">
      <header>
        <h1>Conversion Result</h1>
      </header>
      <main className="main-container">
        <ConversionForm
          initialNumber={number}
          initialFromUnit={fromUnit}
          initialToUnit={toUnit}
          initialResult={result}
        />
        <Link href="/">
        </Link>
      </main>
      <footer>
        <p>&copy; 2024 Unit Converter. All rights reserved.</p>
      </footer>
    </div>
  );
}