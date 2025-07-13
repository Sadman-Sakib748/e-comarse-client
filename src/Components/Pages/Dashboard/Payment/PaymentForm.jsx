// pages/PaymentForm.jsx
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiousSecure from '../../../hooks/useAxiousSecure';
import useAuth from '../../../hooks/useAuth';
import Spinner from '../../Spinner/Spinner';

const PaymentForm = () => {
    const navigate = useNavigate();
    const { newId } = useParams();
    const stripe = useStripe();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const axiousSecure = useAxiousSecure();
    const { user } = useAuth();

    const { isPending, data: productAddifo = {} } = useQuery({
        queryKey: ['productAdd', newId],
        queryFn: async () => {
            const res = await axiousSecure.get(`/productAdd/${newId}`);
            return res.data;
        },
    });
    console.log(productAddifo)
    if (isPending) {
        return <Spinner />;
    }

    const amount = productAddifo.totalPrice;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setIsProcessing(true); // ✅ Start processing

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setErrorMsg(error.message);
            toast.error(error.message);
            setIsProcessing(false); // ✅ Stop processing on error
            return;
        } else {
            setErrorMsg('');
            console.log('payment method', paymentMethod);
        }

        try {
            // create payment intent
            const res = await axiousSecure.post(`/create-payment-intent`, {
                amountInCents,
                newId
            });

            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setErrorMsg(result.error.message);
                toast.error(result.error.message);
            } else {
                setErrorMsg('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');

                    const paymentData = {
                        newId,
                        email: user.email,
                        amount,
                        transactionId: result.paymentIntent.id,
                        paymentMethod: result.paymentIntent.payment_method_types,
                    };

                    const paymentRes = await axiousSecure.post('/payments', paymentData);

                    if (paymentRes.data.insertedId) {
                        console.log('payment successfully');
                        setSuccessMsg('Payment successful!'); // ✅ Success message
                        toast.success('Payment successfully!');
                        navigate('/'); // ✅ Go to homepage
                    } else {
                        toast.error('Payment success, but failed to save record!');
                    }
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
        } finally {
            setIsProcessing(false); // ✅ Stop processing
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6"
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center">💳 Make a Payment</h2>

                <div className="p-4 border border-gray-300 rounded-md bg-white">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    fontFamily: 'Arial, sans-serif',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!stripe || isProcessing || productAddifo.payment_status === 'paid'}
                    className={`w-full py-2 rounded-lg text-white font-semibold transition-all ${isProcessing || productAddifo.payment_status === 'paid'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                >
                    {productAddifo.payment_status === 'paid'
                        ? 'Already Paid'
                        : isProcessing
                            ? 'Processing...'
                            : `Pay Now $${amount}`}
                </button>

                {errorMsg && (
                    <p className="text-sm text-red-500 text-center animate-pulse">{errorMsg}</p>
                )}
                {successMsg && (
                    <p className="text-sm text-green-600 text-center animate-fade-in">{successMsg}</p>
                )}
            </form>
        </div>
    );
};

export default PaymentForm;
