import styles from "../styles/Admin.module.css";
import { App } from "../components/index";

const Admin = () => {
  return (
    <section className={styles.admin}>
      <App />
    </section>
  );
};

export default Admin;
