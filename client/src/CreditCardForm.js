import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreditCardForm.css';
import { formatCreditCardNumber } from './Utils';

import 'react-credit-cards-2/dist/es/styles-compiled.css';

const CreditCardForm = () => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [focused, setFocused] = useState('');

  const handleNumberInputChange = (e) => {
    const formattedValue = formatCreditCardNumber(e.target.value);
    setCreditCardNumber(formattedValue);
  };

  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardNumber: creditCardNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.valid) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error('Server error');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Network error');
    }
  };

  return (
    <div>
      <ToastContainer />
      <Cards
        number={creditCardNumber}
        name="Luhn Algorithm"
        expiry="99/99"
        cvc={123}
        focused={focused}
      />
      <form onSubmit={handleSubmit}>
        <label>
          Credit Card Number:
          <input
            type="tel"
            name="number"
            className="form-control"
            placeholder="4242 4242 4242 4242"
            pattern="[\d| ]{16,22}"
            maxLength="19" 
            value={creditCardNumber}
            onChange={handleNumberInputChange}
            onFocus={handleInputFocus}
            required
          />
        </label>
        <button type="submit">Validate</button>
      </form>
    </div>
  );
};

export default CreditCardForm;