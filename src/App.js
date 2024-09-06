import React, { useEffect, useState } from "react";

const api = {
  key: "ea30f49a0f89529ddbc799bf4526c105",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setWeatherInfo(`${data.weather}, ${data.country} `);
          setWeatherInfo(JSON.stringify(data));
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage("error", error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <div style={{ color: "red" }}>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}{" "}
        </>
      )}
    </div>
  );
}

export default App;
