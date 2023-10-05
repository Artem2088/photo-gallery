import { useQuery } from "@apollo/client";
import { useState } from "react";
import styles from "../styles/ListsLions.module.css";
import { ALL_LIONS } from "../apolo/photos";
import { Header, ListsItemLions, PopupImage } from "../components/index";

const ListsLions = () => {
  const { loading, error, data } = useQuery(ALL_LIONS);
  const [openPopup, setOpenPopup] = useState({ url: "", title: "" });
  const [active, setIsActive] = useState(false);

  if (loading) {
    return <h2>Идет загрузка....</h2>;
  }

  if (error) {
    console.log(error);
    return <h2>Error...</h2>;
  }

  const handleClick = (title, url) => {
    setOpenPopup({ url: url, title: title });
    setIsActive(!active);
  };

  return (
    <>
      <Header />
      <ul className={styles.itemPrev}>
        {data.allLions.map((item) => (
          <ListsItemLions item={item} key={item.id} handleClick={handleClick} />
        ))}
        {active ? (
          <PopupImage image={openPopup} setIsActive={setIsActive} />
        ) : (
          " "
        )}
      </ul>
    </>
  );
};

export default ListsLions;
