// if (registerData.success) {
      //   const userId = registerData.data._id;

      //   // Initiate payment
      //   const paymentResponse = await api.post(`/payment/initiate`, { userId });

      //   const paymentData = paymentResponse.data;

      //   if (paymentData.success && paymentData.paymentUrl) {
      //     window.location.href = paymentData.paymentUrl;
      //   } else {
      //     toast("Payment initialization failed. Please try again.");
      //   }
      // }