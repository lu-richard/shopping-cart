import { useState } from 'react';
import styles from './itemCard.module.css';
import { useOutletContext } from 'react-router-dom';

const ItemCard = ({ id, title, price, imgSrc }) => {
    const [quantity, setQuantity] = useState(1);
    const { setOrders } = useOutletContext();

    const increase = () => setQuantity((quantity) => quantity + 1);
    const decrease = () => {
        if (quantity > 1) {
            setQuantity((quantity) => quantity - 1);
        }
    };
    const addToCart = () => {
        setOrders((orders) => {
            const newOrders = new Map(orders);

            if (newOrders.has(id)) {
                const order = newOrders.get(id);

                newOrders.set(id, { ...order, quantity: order.quantity + quantity });
            }
            else {
                newOrders.set(id, { id, title, price, imgSrc, quantity });
            }

            return newOrders;
        });
    }

    return (
        <div className={styles.card}>
            <img className={styles["item-img"]} src={imgSrc} />
            <h2 className={styles["item-title"]}>{title.length > 40 ? `${title.substring(0, 40)}...` : title}</h2>
            <p>${price.toFixed(2)}</p>
            <div className={styles["item-qty"]}>
                <button className={styles["qty-button"]} onClick={decrease}>-</button>
                <input className={styles["qty-input"]} type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
                <button className={styles["qty-button"]} onClick={increase}>+</button>
            </div>
            <button className={styles["add-cart-button"]} onClick={addToCart}>Add to cart</button>
        </div>
    );
};

export default ItemCard;