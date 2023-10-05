import styles from "../styles/ListsItemEagle.module.css";
import deleteIcon from "../images/icons/delete.svg";
import { useHref } from "react-router";
import { DELETE_EAGLE } from "../apolo/photos";
import { useMutation } from "@apollo/client";

const ListsItemEagle = ({ item, handleClick }) => {
  const path = useHref();
  const { id, title, url } = item;

  const [removeEagle, { error: removeError }] = useMutation(DELETE_EAGLE, {
    update(cache, { data: { removeEagle } }) {
      cache.modify({
        fields: {
          allEagles(currentEagles = []) {
            return currentEagles.filter(
              (eagle) => eagle.__ref !== `Eagle:${removeEagle.id}`
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
      removeEagle({ variables: { id } });
    }
  };

  return (
    <li className={styles.listItem} onClick={() => handleClick(title, url)}>
      <img src={url} alt={title} className={styles.image} />
      <p className={styles.description}>{title}</p>
      {path == "/admin/eagles" ? (
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

export default ListsItemEagle;
