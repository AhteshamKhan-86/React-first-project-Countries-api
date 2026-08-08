import "./CountriesListShimmer.css"

export default function CountriesListShimmer() {
  return (
    <div className="countries-container">
      {Array.from({ length: 100 }).map((el, i) => {
        return <div key={i} className="country-card Shimmer-card"></div>
      })}
    </div>
  )
}
