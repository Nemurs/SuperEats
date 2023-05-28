import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import OrderPage from '../OrderPage';

const OrderPageTimer = () => {
    const userOrders = useSelector(state => (state?.session?.user ? (state.session.user.userOrders) : null));
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(()=> {
        if(userOrders){
            setTimer(60)
        }
        return;
    }, [userOrders])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShouldRefresh(true);
        }, timer * 1000);

        return () => clearTimeout(timeout);
    }, [timer]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Refresh timer every second
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    setShouldRefresh(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <OrderPage shouldRefresh={shouldRefresh} timer={timer} />
        </>
    );
};

export default OrderPageTimer;
