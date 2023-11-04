
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

function luhnValidation(cardNumber) {
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');
  const cardDigits = cleanedCardNumber.split('').map(Number).reverse();

  let sum = 0;

  for (let i = 0; i < cardDigits.length; i++) {
    let digit = cardDigits[i];

    if (i % 2 === 1) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  return sum % 10 === 0;
}
// Create a route and controller for credit card validation
app.post('/validate', (req, res) => {
  const cardNumber = req.body.cardNumber;

  if (!cardNumber) {
    return res.status(400).json({ valid: false, message: 'Card number is required.' });
  }

  const isValid = luhnValidation(cardNumber);

  if (isValid) {
    res.json({ valid: true, message: 'Credit card number is valid.' });
  } else {
    res.json({ valid: false, message: 'Credit card number is invalid.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
