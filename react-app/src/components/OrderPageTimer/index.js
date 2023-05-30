import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import OrderPage from '../OrderPage';

const OrderPageTimer = () => {
    const userOrders = useSelector(state => (state?.session?.user ? (state.session.user.userOrders) : null));
    const [orderLength, setOrderLength] = useState(userOrders ? userOrders.length : 0)
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(()=> {
        if (userOrders && userOrders.length !== orderLength){
            setOrderLength(userOrders.length)
        }
    }, [userOrders])

    useEffect(()=> {
        if(orderLength){
            setTimer(60)
        }
        return;
    }, [orderLength])

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
