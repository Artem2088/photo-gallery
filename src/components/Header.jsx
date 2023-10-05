import { Link, useHref } from "react-router-dom";
import styles from "../styles/Header.module.css";
import AddImage from "./AddImage";
import { useState } from "react";

const Header = ({ deleteCollection }) => {
  const path = useHref();
  const [open, setIsOpen] = useState(false);

  const inputOpen = () => {
    setIsOpen(!open);
  };

  return (
    <header className={styles.header}>
      <div className={styles.upperContainer}>
        <h1 className={styles.title}>PHOTO_GALERY</h1>
        <div className={styles.buttomContainer}>
          {path == "/admin/eagles" ||
          path == "/admin/lions" ||
          path == "/admin/bears" ? (
            " "
          ) : (
            <Link to={"/admin"}>
              <button className={styles.headerButton} type="button">
                <span className={styles.headerSpan}>
                  {path == "/admin" ? "You are Admin" : "Go to Admin"}
                </span>
              </button>
            </Link>
          )}

          {path == "/" ? (
            ""
          ) : (
            <Link to={"/"}>
              <button className={styles.headerButton} type="button">
                <span className={styles.headerSpan}>
                  {path == "/admin" ? "Выйти" : "Назад"}
                </span>
              </button>
            </Link>
          )}
          {path == "/admin/eagles" ||
          path == "/admin/lions" ||
          path == "/admin/bears" ? (
            <button
              className={styles.headerButton}
              type="button"
              onClick={inputOpen}
            >
              <span className={styles.headerSpan}>Добавить фото</span>
            </button>
          ) : (
            " "
          )}
          {path == "/admin/eagles" ||
          path == "/admin/lions" ||
          path == "/admin/bears" ? (
            <button
              className={styles.headerButton}
              type="button"
              onClick={() => deleteCollection()}
            >
              <span className={styles.headerSpan}>Удалить коллекцию</span>
            </button>
          ) : (
            " "
          )}
        </div>
      </div>
      <AddImage open={open} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;
