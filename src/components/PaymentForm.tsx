import React from 'react';
import { paymentConfig } from '../config/payment';
import { paymentMethods } from '../services/payment-methods';

export const PaymentForm: React.FC = () => {
  return (
    <div className="payment-form">
      <h2>Payment Methods</h2>
      <div className="payment-methods">
        {paymentConfig.availableMethods.map(methodId => {
          const method = paymentMethods.find(m => m.id === methodId);
          if (!method) return null;
          
          return (
            <div key={methodId} className="payment-method">
              <span className="method-icon">{method.icon}</span>
              <span className="method-name">{method.name}</span>
            </div>
          );
        })}
      </div>
      <button className="pay-button">
        Pay with {paymentConfig.defaultMethod}
      </button>
    </div>
  );
};