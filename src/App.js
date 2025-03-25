import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("rub");
  const [toCurrency, setToCurrency] = React.useState("usd");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  const [quotes, setQuotes] = React.useState({});

  React.useEffect(() => {
    fetch(
      "https://api.minfin.com.ua/nbu/84b3d96693143dfe418909790fdfbba278a2c01f/"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.usd);
        console.log(data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию о курсах валют");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / quotes[fromCurrency];
    const result = price * Number(quotes[toCurrency]);

    setToPrice(result);
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result = (quotes[fromCurrency] / quotes[toCurrency]) * value;

    setFromPrice(result);
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
