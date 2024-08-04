'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Dropdown from './Dropdown';

interface NewConversionFormProps {
  number: string;
  fromUnit: string;
}

export default function NewConversionForm({ number, fromUnit }: NewConversionFormProps) {
  const [newUnit, setNewUnit] = useState<string>('');
  const router = useRouter();

  const handleNewConversion = () => {
    if (newUnit) {
      const newConversion = `${fromUnit.toLowerCase()}-to-${newUnit.toLowerCase()}`;
      router.push(`/${number}/${newConversion}`);
    }
  };

  return (
    <div className="new-conversion">
      <h2>Convert to another unit:</h2>
      <Dropdown selectedUnit={newUnit} setSelectedUnit={setNewUnit} />
      <button className="convert-button" onClick={handleNewConversion} disabled={!newUnit}>
        Convert
      </button>
    </div>
  );
}