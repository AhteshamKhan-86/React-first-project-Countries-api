import { useState } from "react"
import { useTheme } from "./usetheme.jsx"
import Searchbar from "./Components/Searchbar.jsx"
import Selectmenu from "./Components/Selectmenu.jsx"
import CountriesLists from "./Components/CountriesLists.jsx"
import "./App.css"

export default function Home() {
  const [query, setQuery] = useState("")
  const [region, setRegion] = useState("") 
  const [isdark] = useTheme()

  return (
    <main className={`${isdark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <Searchbar setQuery={setQuery} />
        <Selectmenu setRegion={setRegion} /> 
      </div>

      <CountriesLists query={query} region={region} />
    </main>
  )
}