import styles from "../styles/ListsItemBear.module.css";
import deleteIcon from "../images/icons/delete.svg";
import { useHref } from "react-router";
import { DELETE_BEAR } from "../apolo/photos";
import { useMutation } from "@apollo/client";

const ListsItemBear = ({ item, handleClick }) => {
  const path = useHref();
  const { id, title, url } = item;

  const [removeBear, { error: removeError }] = useMutation(DELETE_BEAR, {
    update(cache, { data: { removeBear } }) {
      cache.modify({
        fields: {
          allBears(currentBears = []) {
            return currentBears.filter(
              (bear) => bear.__ref !== `Bear:${removeBear.id}`
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
      removeBear({ variables: { id } });
    }
  };

  return (
    <li className={styles.listItem} onClick={() => handleClick(title, url)}>
      <img src={url} alt={title} className={styles.image} />
      <p className={styles.description}>{title}</p>
      {path == "/admin/bears" ? (
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

export default ListsItemBear;
