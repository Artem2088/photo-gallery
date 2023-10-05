import { Link, useHref } from "react-router-dom";
import styles from "../styles/PreviewComponent.module.css";
import { useState } from "react";

const PreviewComponent = ({ item }) => {
  const path = useHref();
  const { url, title } = item;
  const [linkTo, setLinkTo] = useState("");

  const handleClick = (e) => {
    const target = e.currentTarget.childNodes[1].innerText;
    if (path == "/") {
      switch (target) {
        case "Eagle":
          setLinkTo("/eagles");
          break;
        case "Lion":
          setLinkTo("/lions");
          break;
        case "Bear":
          setLinkTo("/bears");
          break;
        default:
          setLinkTo("/");
          break;
      }
    }
    if (path == "/admin") {
      switch (target) {
        case "Eagle":
          setLinkTo("/admin/eagles");
          break;
        case "Lion":
          setLinkTo("/admin/lions");
          break;
        case "Bear":
          setLinkTo("/admin/bears");
          break;
        default:
          setLinkTo("/admin");
          break;
      }
    }
  };

  return (
    <Link to={linkTo} reloadDocument>
      <div className={styles.prev} onClick={handleClick}>
        <img
          src={url}
          alt="Картинка не загрузилась, попробуйте позже"
          className={styles.prevImage}
        />
        <span className={styles.title}>{title}</span>
      </div>
    </Link>
  );
};

export default PreviewComponent;
