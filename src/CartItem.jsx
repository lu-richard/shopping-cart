import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styles from './cartItem.module.css';

function CartItem({ id, title, price, imgSrc, quantity }) {
    const [totalQuantity, setTotalQuantity] = useState(quantity);
    const { setOrders } = useOutletContext();

    const increase = () => setTotalQuantity((totalQuantity) => totalQuantity + 1);
    const decrease = () => {
        if (totalQuantity - 1 <= 0) {
            setOrders((orders) => {
                const newOrders = new Map(orders);

                newOrders.delete(id);

                return newOrders;
            });
        }
        else {
            setTotalQuantity((totalQuantity) => totalQuantity - 1);
        }
    }

    useEffect(() => {
        setOrders((orders) => {
            const newOrders = new Map(orders);
            const order = newOrders.get(id);

            newOrders.set(id, { ...order, quantity: totalQuantity });

            return newOrders;
        });
    }, [totalQuantity]);

    return (
        <div className={styles["card"]}>
            <img className={styles["item-img"]} src={imgSrc} />
            <p className={styles["item-title"]}>{title}</p>
            <div className={styles["card-content"]}>
                <p className={styles["total-price"]}>${(price * totalQuantity).toFixed(2)}</p>
                <p>Quantity</p>
                <div className={styles["item-qty"]}>
                    <button className={styles["qty-button"]} onClick={decrease}>-</button>
                    <input className={styles["qty-input"]} type="number" value={totalQuantity} onChange={(e) => setTotalQuantity(parseInt(e.target.value))} />
                    <button className={styles["qty-button"]} onClick={increase}>+</button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;