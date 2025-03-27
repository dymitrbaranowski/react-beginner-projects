import React, { useEffect } from "react";
import { Collection } from "./Collection";
import "./index.scss";

const cats = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [collections, setCollections] = React.useState([]);

  useEffect(() => {
    fetch(
      `https://6786c74df80b78923aa8220f.mockapi.io/collections?${
        categoryId ? `category=${categoryId}` : ""
      }`
    )
      .then((response) => response.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Ошибка загрузки данных");
      });
  }, [categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          collections
            .filter((collection) =>
              collection.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj,i) => (
              <Collection key={collection.id} {...collection} />
            ))
        )}
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
