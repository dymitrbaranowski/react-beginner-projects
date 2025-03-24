import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  const [quotes, setQuotes] = React.useState({});

  React.useEffect(() => {
    fetch(
      "https://api.currencylayer.com/live?access_key=389623e54cec7c8640c982719346bbcb"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.quotes);
        console.log(data.quotes);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию о курсах валют");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / quotes[fromCurrency];
    const result = price * quotes[toCurrency];
    setToPrice(result);
    setFromPrice(value).toFixed(2);
  };

  const onChangeToPrice = (value) => {
    const price = value / quotes[toCurrency];
    const result = price * quotes[fromCurrency];
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
