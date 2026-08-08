import { useTheme } from "../usetheme.jsx";


export default function Header() {
  const [isdark, setIsDark] =  useTheme()
  

  const handleToggle = () => {
    const main = document.querySelector("main");
    if (main) {
      main.classList.toggle("dark");
    }
    setIsDark(!isdark);
    localStorage.setItem("isdarkmode", JSON.stringify(!isdark));
  };

  return (
    <div className="head">
      <header className={`header-container ${isdark ? "dark" : ""}`}>
        <div className="header-content">
          <h2 className="title">
            <a href="/">Where in the world?</a>
          </h2>
          <p className="theme-changer" onClick={handleToggle}>
            <i className={`fa-solid fa-${isdark ? "sun" : "moon"}`}></i>
            &nbsp;&nbsp;
            {isdark ? "Light" : "Dark"} mode
          </p>
        </div>
      </header>
    </div>
  );
}
