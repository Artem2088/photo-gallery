import { useState } from "react";
import styles from "../styles/AddImage.module.css";
import { useMutation } from "@apollo/client";
import {
  ADD_BEAR,
  ADD_EAGLE,
  ADD_LION,
  ALL_BEARS,
  ALL_EAGLES,
  ALL_LIONS,
} from "../apolo/photos";
import { useHref } from "react-router";

const AddImage = ({ open }) => {
  const path = useHref();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [valid, setIsValid] = useState(false);

  const [addEagle, { error }] = useMutation(ADD_EAGLE, {
    update(cache, { data: { createEagle } }) {
      const { allEagles } = cache.readQuery({ query: ALL_EAGLES });
      cache.writeQuery({
        query: ALL_EAGLES,
        data: {
          allEagles: [createEagle, ...allEagles],
        },
      });
    },
  });

  const [addLion, { error: errorAddLion }] = useMutation(ADD_LION, {
    update(cache, { data: { createLion } }) {
      const { allLions } = cache.readQuery({ query: ALL_LIONS });
      cache.writeQuery({
        query: ALL_LIONS,
        data: {
          allLions: [createLion, ...allLions],
        },
      });
    },
  });

  const [addBear, { error: errorAddBear }] = useMutation(ADD_BEAR, {
    update(cache, { data: { createBear } }) {
      const { allBears } = cache.readQuery({ query: ALL_BEARS });
      cache.writeQuery({
        query: ALL_BEARS,
        data: {
          allBears: [createBear, ...allBears],
        },
      });
    },
  });

  const changeUrl = (e) => {
    setUrl(e.target.value);
    setIsValid(e.target.closest("form")?.checkValidity());
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
    setIsValid(e.target.closest("form")?.checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (path == "/admin/eagles") {
      addEagle({
        variables: {
          id: Math.random().toString(16).slice(13),
          title: title,
          url: url,
        },
      });
    }
    if (path == "/admin/lions") {
      addLion({
        variables: {
          id: Math.random().toString(16).slice(13),
          title: title,
          url: url,
        },
      });
    }
    if (path == "/admin/bears") {
      addBear({
        variables: {
          id: Math.random().toString(16).slice(13),
          title: title,
          url: url,
        },
      });
    }
  };

  if (error || errorAddLion || errorAddBear) {
    console.log(error);
    return <h2>Error</h2>;
  }

  return (
    <form
      className={open ? styles.form : styles.formDisabled}
      onSubmit={handleSubmit}
      name="form"
    >
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Cсылка на фотографию"
          className={styles.inputAdd}
          value={url}
          onChange={changeUrl}
          required
        />
        <input
          required
          minLength={3}
          maxLength={30}
          type="text"
          placeholder="Описание"
          className={styles.inputAdd}
          value={title}
          onChange={changeTitle}
        />
      </div>
      <button
        type="submit"
        className={styles.button}
        onClick={handleSubmit}
        disabled={!valid}
      >
        <span className={styles.spanButton}>Отправить</span>
      </button>
    </form>
  );
};

export default AddImage;
