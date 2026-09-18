import React, { useState } from 'react';

interface DropdownProps {
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };
  
  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-trigger">
        {selectedValue || placeholder}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};