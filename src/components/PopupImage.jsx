import styles from "../styles/Popup.module.css";

const PopupImage = ({ image, setIsActive }) => {
  const { id, url, title } = image;

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
