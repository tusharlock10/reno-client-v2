import axios from '../api';
import RazorpayCheckout from 'react-native-razorpay';

export const completePayment = async ({
  amount,
  name,
  email,
  mobile,
  orderId,
}) => {
  const razorpayKeyId = 'rzp_test_oCjDks1GbKEPfO';
  let data;
  try {
    data = (
      await axios.post('/createPaymentOrder', {
        amount,
        name,
        email,
        mobile,
      })
    ).data;
  } catch (error) {
    return {success: false, message: 'Payment error', error, data: null};
  }

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
  } catch (error) {
    return {success: false, message: 'Payment cancelled', error, data: null};
  }

  const to_send = {
    orderId,
    amount: data.amount / 100,
    receipt: data.receipt,
    paymentOrderId: data.id,
    paymentDescription: options.description,
    paymentId: response.razorpay_payment_id,
  };

  try {
    await axios.post('/confirmPayment', to_send);
  } catch (error) {
    return {
      success: false,
      message: `Payment processed but couldn't communicate with the server`,
      error,
      data: to_send,
    };
  }

  return {success: true, message: 'Payment Successful', data: to_send};
};
