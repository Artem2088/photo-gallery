import { useQuery } from "@apollo/client";
import styles from "../styles/ListsBears.module.css";
import { ALL_BEARS } from "../apolo/photos";
import { Header, ListsItemBear, PopupImage } from "../components/index";
import { useState } from "react";

const ListsBears = () => {
  const { loading, error, data } = useQuery(ALL_BEARS);
  const [active, setIsActive] = useState(false);
  const [openPopup, setOpenPopup] = useState({ url: "", title: "" });

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
        {data.allBears.map((item) => (
          <ListsItemBear item={item} key={item.id} handleClick={handleClick} />
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

export default ListsBears;
