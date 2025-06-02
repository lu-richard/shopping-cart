import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './navigation.module.css';

function Navigation() {
    const [orders, setOrders] = useState(new Map());
    const [filters, setFilters] = useState(null);

    const [storeItems, setStoreItems] = useState(null);
    const [origStoreItems, setOrigStoreItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error(`Error ${response.status}`);
                }
                return response.json();
            })
            .then((responseJson) => {
                setStoreItems(responseJson);
                setOrigStoreItems(JSON.parse(JSON.stringify(responseJson)));
                
                const uniqueCats = new Set(responseJson.map((item) => item.category));
                setFilters([...uniqueCats].map((category) => ({ id: crypto.randomUUID(), category })));
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <nav className={styles["nav-bar"]}>
                <h1>Everything Store</h1>
                <Link to="/" className={styles["bar-button"]}>Home</Link>
                <Link to="shop" className={styles["bar-button"]}>Shop</Link>
                <Link to="checkout" className={styles["bar-button"]}>Checkout</Link>
                <p>Cart: {[...orders.values()].map((order) => order.quantity).reduce((total, currQty) => total + currQty, 0)}</p>
            </nav>
            <div className={styles["main-content"]}>
                <Outlet context={{ orders, setOrders, filters, storeItems, setStoreItems, origStoreItems, error, loading }}/>
            </div>
        </>
    );
}

export default Navigation;