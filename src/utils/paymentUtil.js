import axios from '../api';
import RazorpayCheckout from 'react-native-razorpay';

export const completePayment = async ({amount, name, email, mobile}) => {
  const razorpayKeyId = 'rzp_test_oCjDks1GbKEPfO';
  const {data} = await axios.post('/createPaymentOrder', {
    amount,
    name,
    email,
    mobile,
  });

  const options = {
    description: 'Reno restaurant booking payment',
    image:
      'https://www.renoapp.in/wp-content/uploads/2020/04/cropped-android-chrome-512x512-1.png',
    currency: 'INR',
    key: razorpayKeyId,
    amount: data.amount,
    name: 'Reno',
    order_id: data.id,
    prefill: {email: data.email, name: data.name, contact: data.phoneNumber},
    theme: {color: 'red'},
  };

  let response;
  try {
    response = await RazorpayCheckout.open(options);
  } catch (e) {
    return {error: e, payment_id: null};
  }

  const to_send = {
    amount: data.amount / 100,
    receipt: data.receipt,
    order_id: data.id,
    description: options.description,
    razorpay_payment_id: response.razorpay_payment_id,
  };

  const {data: data2} = await axios.post('/confirmPayment', to_send);

  return {paymentId: data2.paymentId, error: null};
};
