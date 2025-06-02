import styles from './homePage.module.css';

function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles["main-heading"]}>Welcome to the Everything Store!</h1>
      <em>100% Satisfaction or Your Money Back!</em>
    </div>
  );
}

export default HomePage;