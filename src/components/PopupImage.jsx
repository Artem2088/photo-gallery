import { useEffect } from "react";
import styles from "../styles/Popup.module.css";

const PopupImage = ({ image, setIsActive }) => {
  const { url, title } = image;

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div
      className={url ? styles.popupContainer : styles.popupContainerDisabled}
      onClick={() => setIsActive(false)}
    >
      <img src={url} alt={title} className={styles.popupImage} />
    </div>
  );
};

export default PopupImage;
