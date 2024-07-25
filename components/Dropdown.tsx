import { useState } from 'react';

const units = ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Micrometer', 'Nanometer', 'Mile', 'Yard', 'Foot', 'Inch', 'Light Year'];

export default function Dropdown({ selectedUnit, setSelectedUnit }) {
  return (
    <div className="dropdown">
      <div className="dropdown-list">
        {units.map((unit) => (
          <div 
            key={unit} 
            onClick={() => setSelectedUnit(unit)}
            className={`dropdown-item ${selectedUnit === unit ? 'selected' : ''}`}
          >
            {unit}
          </div>
        ))}
      </div>
    </div>
  );
}
