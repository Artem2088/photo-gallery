import { useQuery } from "@apollo/client";
import styles from "../styles/ListsBears.module.css";
import { ALL_BEARS } from "../apolo/photos";
import { Header, ListsItemBear, PopupImage } from "../components/index";
import { useEffect, useState } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const ListsBears = () => {
  const { loading, error, data } = useQuery(ALL_BEARS);
  const [active, setIsActive] = useState(false);
  const [openPopup, setOpenPopup] = useState({ url: "", title: "" });
  const [listsItem, setListsItems] = useState([]);
  const { setIsFetching } = useInfiniteScroll(fetchMoreListItems);

  useEffect(() => {
    if (!data) {
      return;
    }
    setListsItems(data.allBears);
  }, [loading, data]);

  if (loading) {
    return <h2>Идет загрузка....</h2>;
  }

  if (error) {
    console.log(error);
    return <h2>Error...</h2>;
  }

  function fetchMoreListItems() {
    setListsItems([...listsItem, ...data.allBears]);
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
          <ListsItemBear item={item} key={index} handleClick={handleClick} />
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
