import './CountryCardShimmer.css'

export default function CountryCardShimmer() {
  return (
    <div className='main'>
        <div>
            <div className='img'></div>
        </div>
        <div className="data">
        <div className='country-name'></div>
      {Array.from({ length: 5 }).map((el, i) => {
        return <div key={i} className='detail'></div>
      })}
    </div>
    </div>
  )
}
