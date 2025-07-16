import React from 'react';
import useAxiousSecure from '../../../hooks/useAxiousSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Spinner from '../../Spinner/Spinner';

const PaymentHistory = () => {
  const { user, loading } = useAuth(); 
  const axiosSecure = useAxiousSecure();

  const {
    isPending,
    data: payments = [],
  } = useQuery({
    enabled: !!user?.email, 
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (loading || isPending || !user?.email) {
    return <Spinner />;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Payment Method</th>
            <th className="py-2 px-4 border">Transaction ID</th>
            <th className="py-2 px-4 border">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{payment.email}</td>
              <td className="py-2 px-4 border">${(payment.amount / 100).toFixed(2)}</td>
              <td className="py-2 px-4 border">{payment.paymentMethod}</td>
              <td className="py-2 px-4 border">{payment.transactionId}</td>
              <td className="py-2 px-4 border">
                {format(new Date(payment.payment_date), 'PPPpp')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {payments.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No payment history found.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
