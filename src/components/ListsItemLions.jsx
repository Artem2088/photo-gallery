import styles from "../styles/ListsItemLions.module.css";
import deleteIcon from "../images/icons/delete.svg";
import { useHref } from "react-router";
import { DELETE_LION } from "../apolo/photos";
import { useMutation } from "@apollo/client";

const ListsItemLions = ({ item, handleClick }) => {
  const { id, title, url } = item;
  const path = useHref();

  const [removeLion, { error: removeError }] = useMutation(DELETE_LION, {
    update(cache, { data: { removeLion } }) {
      cache.modify({
        fields: {
          allLions(currentLions = []) {
            return currentLions.filter(
              (lion) => lion.__ref !== `Lion:${removeLion.id}`
            );
          },
        },
      });
    },
  });

  if (removeError) {
    return <h2>Error...</h2>;
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    if (e.currentTarget.dataset.set == "delete") {
      removeLion({ variables: { id } });
    }
  };

  return (
    <li className={styles.listItem} onClick={() => handleClick(title, url)}>
      <img src={url} alt={title} className={styles.image} />
      <p className={styles.description}>{title}</p>
      {path == "/admin/lions" ? (
        <button
          className={styles.delete}
          onClick={handleDelete}
          data-set="delete"
        >
          <img src={deleteIcon} alt="delete" className={styles.deleteImg} />
        </button>
      ) : (
        ""
      )}
    </li>
  );
};

export default ListsItemLions;
