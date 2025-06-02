import { useOutletContext } from "react-router-dom";
import styles from './filter.module.css';

function Filter({ category }) {
    const { storeItems, setStoreItems, origStoreItems } = useOutletContext();

    const checkEnabled = () => {
        let enabled = true;

        storeItems.forEach((item) => {
            if (item.category !== category) {
                enabled = false;
            }
        });

        return enabled;
    }

    const toggleFilter = () => {
        if (!checkEnabled()) {
            setStoreItems((items) => items.filter((item) => item.category == category));
        }
        else {
            setStoreItems(origStoreItems);
        }
    };

    const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    return (
        <div className={styles.container}>
            <input type="checkbox" onChange={toggleFilter} />
            <p className={styles.title}>{category.split(" ").map((word) => capitalizeFirstLetter(word)).join(" ")}</p>
        </div>
    );
}

export default Filter;