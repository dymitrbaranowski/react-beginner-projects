import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  const [rates, setRates] = React.useState({});

  React.useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        console.log(data.rates);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию о курсах валют");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = Number(value) / rates[fromCurrency];
    const result = price * Number(rates[toCurrency]);

    setToPrice(result);
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;

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
