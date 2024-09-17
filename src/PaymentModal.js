import React, { useState } from 'react';
import './PaymentModal.css';

function PaymentModal({ isOpen, onClose, totalPrice, planName }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Mockup Payment</h2>
        <p className="warning">
          WARNING: This is a mockup payment form. Do NOT enter real payment details.
        </p>
        {!showConfirmation ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name on Card:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV:</label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <p className="total-amount">Total Amount: ${totalPrice}</p>
            <div className="button-group">
              <button type="submit" className="pay-button">Pay Now</button>
              <button onClick={onClose} className="close-button">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="confirmation">
            <h3>Payment Confirmed!</h3>
            <p>Thank you for your mock payment for the {planName}.</p>
            <p className="total-amount">Total Amount: ${totalPrice}</p>
            <button onClick={onClose} className="close-button">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentModal;