import styles from "../styles/App.module.css";
import { Footer, Header, PreviewComponent } from "../components/index";
import { useQuery } from "@apollo/client";
import { ALL_BEARS, ALL_EAGLES, ALL_LIONS } from "../apolo/photos";
import { useEffect, useState } from "react";

const App = () => {
  const { loading: onLoad, data: eagle, error } = useQuery(ALL_EAGLES);
  const { loading: load, data: lion } = useQuery(ALL_LIONS);
  const { loading: preload, data: bear } = useQuery(ALL_BEARS);
  const [image, setImage] = useState([]);

  useEffect(() => {
    getImagePrev();
  }, [onLoad, load, preload]);

  if (error) {
    console.log(error);
    return <h2>Error....</h2>;
  }

  const getImagePrev = () => {
    let imageArr = [];

    for (let key in eagle) {
      let item = eagle[key][0];
      imageArr.push({ url: item.url, title: item.__typename });
    }
    for (let key in lion) {
      let item = lion[key][0];
      imageArr.push({ url: item.url, title: item.__typename });
    }
    for (let key in bear) {
      let item = bear[key][0];
      imageArr.push({ url: item.url, title: item.__typename });
    }
    setImage(imageArr);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        {onLoad || load || preload ? (
          <h3>Loading...</h3>
        ) : (
          image.map((item, index) => (
            <PreviewComponent item={item} key={index} />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
