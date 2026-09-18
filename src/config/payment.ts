export interface PaymentConfig {
  availableMethods: string[];
  defaultMethod: string;
  currency: string;
  requireVerification: boolean;
}

export const paymentConfig: PaymentConfig = {
  availableMethods: ['credit_card', 'paypal'],
  defaultMethod: 'credit_card',
  currency: 'USD',
  requireVerification: true,
};