import { useState, useRef, useEffect } from 'react';
import '../styles/Dropdown.css'; // Assuming you have a CSS file for styles

const Dropdown = ({ options, placeholder, setDropdownValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setDropdownValue(option);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-header flex justify-between items-center" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption : placeholder}
        <span className={`arrow w-5 ${isOpen ? 'open' : ''}`}>
          {isOpen ? <img className='w-full' src="../../arrowUp.svg" alt="svg arrow Up" /> : 
          <img className='w-full' src="../../ArrowDown.svg" alt="svg arrow down" />}
        </span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, idx) => (
            <li
              key={idx}
              className="dropdown-item"
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;