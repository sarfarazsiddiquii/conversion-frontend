import { useState } from 'react';

const units = ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Micrometer', 'Nanometer', 'Mile', 'Yard', 'Foot', 'Inch', 'Light Year'];

export default function Dropdown({ selectedUnit, setSelectedUnit }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (unit) => {
    setSelectedUnit(unit);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-selected" onClick={toggleDropdown}>
        {selectedUnit} <span>&#9660;</span>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {units.map((unit) => (
            <div 
              key={unit} 
              onClick={() => handleSelect(unit)}
              className={`dropdown-item ${selectedUnit === unit ? 'selected' : ''}`}
            >
              {unit}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}