// Payment.jsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


// Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_SECRET); // ✅ Check spelling too

const Payment = () => {


    return (
       
            <Elements stripe={stripePromise}>
                <PaymentForm  />
            </Elements>

    );
};

export default Payment;
