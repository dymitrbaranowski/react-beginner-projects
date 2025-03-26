import React, { useEffect } from "react";
import { Collection } from "./Collection";
import "./index.scss";

function App() {
  const [collections, setCollections] = React.useState([]);

  useEffect(() => {
    fetch("https://6786c74df80b78923aa8220f.mockapi.io/collections")
      .then((response) => response.json())
      .then((data) => setCollections(data))
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Ошибка загрузки данных");
      });
  }, []);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          <li className="active">Все</li>
          <li>Горы</li>
          <li>Море</li>
          <li>Архитектура</li>
          <li>Города</li>
        </ul>
        <input className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {collections.map((collection) => (
          <Collection
            name={collection.name}
            key={collection.id}
            images={collection.photos}
          />
        ))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
