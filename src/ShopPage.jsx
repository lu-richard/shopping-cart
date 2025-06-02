import ItemCard from './ItemCard';
import styles from './shopPage.module.css';
import { useOutletContext } from 'react-router-dom';
import Filter from './Filter';

function ShopPage() {
    const { filters, storeItems, error, loading } = useOutletContext();

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className={styles["filters-section"]}>
                <div className={styles["filters-content"]}>
                    <h2 className={styles["filters-title"]}>Filters</h2>
                    <hr />
                    {filters ? [...filters].map((filter) => <Filter key={filter.id} category={filter.category} />) : <p>Loading...</p>}
                </div>
            </div>
            <div className={styles["item-grid"]}>
                {storeItems.map((item) => <ItemCard key={item.id} id={item.id} title={item.title} price={item.price} imgSrc={item.image} />)}
            </div>
        </>
    );
}

export default ShopPage;