import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountryCardShimmer from "./CountriesListShimmer.jsx";

export default function CountriesLists({ query = "", region = "" }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}Data.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Data.json file nahi mili");
        return res.json();
      })
      .then((data) => {
        const cleanedData = data.map((c) => {
          const name = typeof c.name === "object" ? c.name?.common || c.name?.official : c.name;
          const code2 = c.cca2 || c.alpha2Code || "";

          const flag =
            c.flags?.svg ||
            c.flags?.png ||
            (typeof c.flags === "string" && c.flags.startsWith("http") ? c.flags : "") ||
            (typeof c.flag === "string" && c.flag.startsWith("http") ? c.flag : "") ||
            (code2 ? `https://flagcdn.com/w320/${code2.toLowerCase()}.png` : "");

          const rawPop = c.population ?? c.pop;
          const capital = Array.isArray(c.capital) ? c.capital[0] : c.capital;

          return {
            ...c,
            code: c.alpha3Code || c.cca3 || code2 || name,
            displayName: name || "N/A",
            displayFlag: flag,
            displayPopulation: rawPop != null ? Number(rawPop).toLocaleString("en-IN") : "N/A",
            displayCapital: capital || "N/A",
          };
        });
        setCountries(cleanedData);
      })
      .catch((err) => {
        console.error("Local Fetch Error:", err);
        setError("Countries data load nahi ho pa raha hai.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CountryCardShimmer />;
  if (error) return <h2 style={{ textAlign: "center", color: "red", marginTop: "30px" }}>{error}</h2>;

  const searchQuery = query.toLowerCase().trim();

  const filteredCountries = countries.filter((c) => {
    const matchesSearch = c.displayName.toLowerCase().includes(searchQuery);
    const matchesRegion = region ? c.region === region : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="countries-container">
      {filteredCountries.map((country) => (
        <Link key={country.code} className="country-card" to={`/${country.displayName}`} state={country}>
          {country.displayFlag ? (
            <img src={country.displayFlag} alt={`${country.displayName} flag`} loading="lazy" />
          ) : (
            <div className="no-flag">No Flag Available</div>
          )}
          <div className="card-text">
            <h3 className="card-title">{country.displayName}</h3>
            <p><b>Population: </b>{country.displayPopulation}</p>
            <p><b>Region: </b>{country.region || "N/A"}</p>
            <p><b>Capital: </b>{country.displayCapital}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}