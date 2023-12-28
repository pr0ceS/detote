import { useEffect, useState } from "react";

const GetRandomTheme = ({ price, locale, oldPrice }) => {
  const [newPrice, setNewPrice] = useState(price);
  const [newOldPrice, setNewOldPrice] = useState(oldPrice);

  function updatePrice() {
    switch (locale) {
      case "EU":
        setNewPrice(price);
        setNewOldPrice(oldPrice);
        break;
      case "US":
        setNewPrice(price);
        setNewOldPrice(oldPrice);
        break;
      case "UK":
        setNewPrice(price * 0.875);
        setNewOldPrice(oldPrice * 0.875);
        break;
      case "CA":
        setNewPrice(price * 1.475);
        setNewOldPrice(oldPrice * 1.475);
        break;
      case "AU":
        setNewPrice(price * 1.68);
        setNewOldPrice(oldPrice * 1.68);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    updatePrice();
  }, [locale]);

  const percentageOff = Math.ceil(((newOldPrice - newPrice) / newOldPrice) * 10);

	let themes = [
    [
      `Bespaar ${locale === "EU" ? "€" : locale === "US" ? "$" : locale === "UK" ? "£" : locale === "CA" ? "CA$" : "AU$"}${(newOldPrice - newPrice).toLocaleString(locale === "EU" ? "nl-nl" : `en-${locale}`,{minimumFractionDigits:(locale === "EU" ? 0 : 2), maximumFractionDigits:(locale === "EU" ? 0 : 2)})}!`,
      "#ec008c",
      "white",
      "#ad0066"
    ],
    [`${percentageOff}0% korting`, "#E5E5EA80", "black", "#aaaaaa80"],
  ]

  const [data, setData] = useState(themes[Math.floor(Math.random() * themes.length)]);

  useEffect(() => {
    setData(themes[Math.floor(Math.random() * themes.length)]);
    updatePrice();
  }, [percentageOff, locale]);

  return (
    <span className="sale-pill" style={{ background: data[1], color: data[2], borderColor: data[3] }}>
      {data[0]}
    </span>
  );
};

export default GetRandomTheme;