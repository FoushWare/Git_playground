export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit_card',
    name: 'Credit Card',
    icon: 'credit-card',
    enabled: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'paypal',
    enabled: true,
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    icon: 'apple',
    enabled: true,
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    icon: 'google',
    enabled: true,
  },
];

export function getPaymentMethod(id: string): PaymentMethod | undefined {
  return paymentMethods.find(method => method.id === id);
}

export function isPaymentMethodEnabled(id: string): boolean {
  const method = getPaymentMethod(id);
  return method?.enabled ?? false;
}