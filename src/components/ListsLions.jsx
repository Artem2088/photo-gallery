import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styles from "../styles/ListsLions.module.css";
import { ALL_LIONS } from "../apolo/photos";
import { Header, ListsItemLions, PopupImage } from "../components/index";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const ListsLions = () => {
  const { loading, error, data } = useQuery(ALL_LIONS);
  const [openPopup, setOpenPopup] = useState({ url: "", title: "" });
  const [active, setIsActive] = useState(false);
  const [listsItem, setListsItems] = useState([]);
  const { setIsFetching } = useInfiniteScroll(fetchMoreListItems);

  useEffect(() => {
    if (!data) {
      return;
    }
    setListsItems(data.allLions);
  }, [loading, data]);

  if (loading) {
    return <h2>Идет загрузка....</h2>;
  }

  if (error) {
    console.log(error);
    return <h2>Error...</h2>;
  }

  function fetchMoreListItems() {
    setListsItems([...listsItem, ...data.allLions]);
    setIsFetching(false);
  }

  const handleClick = (title, url) => {
    setOpenPopup({ url: url, title: title });
    setIsActive(!active);
  };

  const deleteCollection = () => {
    setListsItems([]);
  };

  return (
    <>
      <Header deleteCollection={deleteCollection} />
      <ul className={styles.itemPrev}>
        {listsItem.map((item, index) => (
          <ListsItemLions item={item} key={index} handleClick={handleClick} />
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
