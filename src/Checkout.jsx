import { useOutletContext } from "react-router-dom";
import CartItem from "./CartItem";
import styles from './checkout.module.css';

function Checkout() {
    const { orders, setOrders } = useOutletContext();
    const subtotal = [...orders.values()].reduce((acc, order) => acc + order.price * order.quantity, 0);
    const tax = subtotal * 0.0725;

    const checkout = () => setOrders(new Map());

    return (
        <div className={styles.container}>
            {[...orders.values()].map((order) => <CartItem key={order.id} id={order.id} title={order.title} price={order.price} imgSrc={order.imgSrc} quantity={order.quantity} />)}
            <hr className={styles.divider} />
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${(tax).toFixed(2)}</p>
            <p>Total: ${(subtotal + tax).toFixed(2)}</p>
            <button className={styles["checkout-button"]} onClick={checkout}>Checkout</button>
        </div>
    );
}

export default Checkout;