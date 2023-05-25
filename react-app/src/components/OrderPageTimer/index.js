import React, { useEffect, useState } from 'react';
import OrderPage from '../OrderPage';

const OrderPageTimer = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [timer, setTimer] = useState(60); // Initial timer value in seconds

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRefresh(true);
    }, timer * 1000); // Convert timer value to milliseconds

    return () => clearTimeout(timeout);
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          setShouldRefresh(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000); // Refresh timer every second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <OrderPage shouldRefresh={shouldRefresh} timer={timer} />
    </>
  );
};

export default OrderPageTimer;
