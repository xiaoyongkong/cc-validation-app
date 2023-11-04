import React, { useState } from 'react';
import CreditCardForm from './CreditCardForm';

import Toastify from './Toastify';


function App() {
  const [validationResult, setValidationResult] = useState(null);

  const handleValidation = (isValid, message) => {
    setValidationResult({ isValid, message });
  };

  return (
    <div className="App">
      <Toastify />
      <h1>Credit Card Luhn Validation</h1>
      <CreditCardForm/>
    </div>
  );
}

export default App;
