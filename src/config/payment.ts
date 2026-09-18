export interface PaymentConfig {
  availableMethods: string[];
  defaultMethod: string;
  currency: string;
  requireVerification: boolean;
  minAmount: number;
  maxAmount: number;
}

export const paymentConfig: PaymentConfig = {
  availableMethods: ['credit_card', 'paypal', 'apple_pay', 'google_pay'],
  defaultMethod: 'apple_pay',
  currency: 'USD',
  requireVerification: true,
  minAmount: 10,
  maxAmount: 10000,
};