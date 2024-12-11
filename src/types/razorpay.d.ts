declare global {
  interface Window {
      Razorpay: {
          new (options: RazorpayOptions): Razorpay;
      };
  }

  type RazorpayOptions = {
      key: string;
      amount: number;
      currency: string;
      name: string;
      description?: string;
      image?: string;
      handler: (response: RazorpayResponse) => void;
      prefill?: {
          name?: string;
          email?: string;
          contact?: string;
      };
      notes?: Record<string, string>;
      theme?: {
          color?: string;
      };
  };

  type RazorpayResponse = {
      razorpay_payment_id: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
  };

  class Razorpay {
      constructor(options: RazorpayOptions);
      open(): void;
      on(event: string, callback: (response: RazorpayResponse) => void): void;
  }
}

export {};  // Make sure this file is treated as a module
