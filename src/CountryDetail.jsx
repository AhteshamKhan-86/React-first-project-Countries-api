import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./CountryCard.css";
import CountryCardShimmer from "./Components/CountryCardShimmer.jsx";
import { useTheme } from "./usetheme.jsx";

export default function CountryDetail() {
  const { country: countryParam } = useParams();
  const navigate = useNavigate();
  const [isdark] = useTheme();

  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("/Data.json")
      .then((res) => res.json())
      .then((data) => {
        const query = decodeURIComponent(countryParam || "").trim().toLowerCase();

        // Target Country find karna
        const found = data.find((c) => {
          const name = typeof c.name === "object" ? c.name?.common : c.name;
          const code = c.cca3 || c.alpha3Code || c.cca2 || c.alpha2Code;
          return name?.toLowerCase() === query || code?.toLowerCase() === query;
        });

        if (!found) return setCountryData(false);

        // Border codes to Full Name resolution
        const borders = (found.borders || []).map((code) => {
          const match = data.find((c) => (c.cca3 || c.alpha3Code) === code);
          const name = typeof match?.name === "object" ? match.name?.common : match?.name;
          return { code, name: name || code };
        });

        // Data Extractions
        const name = typeof found.name === "object" ? found.name?.common : found.name;
        const native = Object.values(found.name?.native || {})[0]?.common || found.nativeName || name || "N/A";
        const flag = found.flags?.svg || found.flags?.png || (typeof found.flags === "string" ? found.flags : "") || (found.cca2 ? `https://flagcdn.com/w320/${found.cca2.toLowerCase()}.png` : "");
        const currencies = Object.values(found.currencies || {}).map((c) => c.name || c).slice(0, 3).join(", ") || "N/A";
        const languages = Object.values(found.languages || {}).slice(0, 4).join(", ") || "N/A";
        const capital = [].concat(found.capital || []).join(", ") || "N/A";
        const domain = [].concat(found.tld || found.topLevelDomain || []).join(", ") || "N/A";

        setCountryData({
          name, native, flag, currencies, languages, capital, domain, borders,
          population: found.population ? found.population.toLocaleString("en-IN") : "N/A",
          region: found.region || "N/A",
          subregion: found.subregion || "N/A",
        });
      })
      .catch(() => setCountryData(false))
      .finally(() => setLoading(false));
  }, [countryParam]);

  if (loading) return <CountryCardShimmer />;
  if (!countryData) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Country not found!</h2>;

  return (
    <main className={isdark ? "dark" : ""}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>

        <div className="country-details">
          {countryData.flag ? <img src={countryData.flag} alt={`${countryData.name} flag`} /> : <div className="no-flag">No Flag Available</div>}

          <div className="details-text-container">
            <h1>{countryData.name}</h1>

            <div className="details-text">
              <p><b>Native Name:</b> {countryData.native}</p>
              <p><b>Population:</b> {countryData.population}</p>
              <p><b>Region:</b> {countryData.region}</p>
              <p><b>Sub Region:</b> {countryData.subregion}</p>
              <p><b>Capital:</b> {countryData.capital}</p>
              <p><b>Top Level Domain:</b> {countryData.domain}</p>
              <p><b>Currencies:</b> {countryData.currencies}</p>
              <p><b>Languages:</b> {countryData.languages}</p>
            </div>

            <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
              {countryData.borders.length ? (
                countryData.borders.map((b) => <Link key={b.code} to={`/${b.name}`}>{b.name}</Link>)
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}