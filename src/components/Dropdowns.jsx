import { useState, useRef, useEffect } from 'react';

const Dropdowns = ({ dropdowns }) => {
  const [openStates, setOpenStates] = useState(new Array(dropdowns.length).fill(false));
  const [contentHeights, setContentHeights] = useState(new Array(dropdowns.length).fill(0));
  const contentRefs = useRef([]);

  const toggleDropdown = (index) => {
    setOpenStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      setContentHeights((prevHeights) => {
        const newHeights = [...prevHeights];
        newHeights[index] = ref.scrollHeight;
        return newHeights;
      });
    });
  }, [openStates]);

  return dropdowns.map((dropdown, index) => (
    <div className={`dropdown ${openStates[index] ? 'open' : ''}`} key={index}>
      <div className="dropdown-title" onClick={() => toggleDropdown(index)}>
        <h1>{dropdown.question}</h1>
        <p>{openStates[index] ? '-' : '+'}</p>
      </div>
      <div
        className={`dropdown-p ${openStates[index] ? 'open' : ''}`}
        style={{ maxHeight: openStates[index] ? `${contentHeights[index]}px` : '0' }}
        ref={(ref) => (contentRefs.current[index] = ref)}
      >
        <p>{dropdown.answer}</p>
      </div>
    </div>
  ));
};

export default Dropdowns;
