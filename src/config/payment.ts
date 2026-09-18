export interface PaymentConfig {
  availableMethods: string[];
  defaultMethod: string;
  currency: string;
  requireVerification: boolean;
  minAmount: number;
  maxAmount: number;
}

export const paymentConfig: PaymentConfig = {
  availableMethods: ['credit_card', 'paypal', 'apple_pay'],
  defaultMethod: 'paypal',
  currency: 'USD',
  requireVerification: true,
  minAmount: 10,
  maxAmount: 10000,
};