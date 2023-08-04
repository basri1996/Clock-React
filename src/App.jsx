import { useEffect, useState } from "react";
import "./App.css";
import arrowup from "./assets/desktop/icon-arrow-up.svg";
import arrowdown from "./assets/desktop/icon-arrow-down.svg";
import sun from "./assets/desktop/icon-sun.svg";
import moon from "./assets/desktop/icon-moon.svg";
import axios from "axios";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDiv, setShowDiv] = useState(true);
  const [data, setData] = useState("");
  const [dayOfYear, setDayOfYear] = useState(0);
  const [dayOfWeak, setDayOfWeak] = useState(0);
  const [numberOfWeeks, setNumberOfWeeks] = useState(0);

  

  useEffect(() => {
    function Splitter() {
      let string = currentTime;
      let timeString = string.toString().substring(25, 33);
      let gmtString = string.toString().substring(16, 18);
      console.log(timeString);
      console.log(gmtString);
      console.log(currentTime);
    }
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    setDayOfYear(dayOfYear);
    Splitter();
  }, [currentTime]);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    setDayOfWeak(day);
  }, []);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const weekNumber = Math.floor(dayOfYear / 7);
    setNumberOfWeeks(weekNumber);
  }, []);

  useEffect(() => {
    const resp = async () => {
      try {
        const response = await axios.get(`https://api.ipbase.com/v1/json`);
        const data = await response.data;
        setData(data);
      } catch (error) {
        alert("error");
      }
    };
    resp();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className={`App ${
        currentTime.getHours() >= 23 || currentTime.getHours() < 11
          ? "night"
          : "day"
      }`}
    >
      <div className="shadow">
        {showDiv ? (
          <div className="row">
            <p className="text-p">
              “The science of operations, as derived from mathematics more
              especially, is a science of itself, and has its own abstract truth
              and value.”
            </p>
            <p className="author-p">Ada Lovelace</p>
          </div>
        ) : null}
        <div className="row">
          <p className="morning-p">
            <img
              src={
                currentTime.getHours() >= 23 || currentTime.getHours() < 11
                  ? moon
                  : sun
              }
              alt="ddd"
              className="sun"
            />
            {currentTime.getHours() >= 23 || currentTime.getHours() < 11
              ? "GOOD EVENING, IT’S CURRENTLY "
              : "GOOD MORNING, IT’S CURRENTLY"}
          </p>
          <p className="clock">{currentTime.toLocaleTimeString()}</p>
          <div className="footer-div">
            <p className="location-p">
              IN{" "}
              {typeof data === "object"
                ? data?.city.toString().toUpperCase()
                : ""}
              ,
              {typeof data === "object"
                ? data?.country_name.toString().toUpperCase()
                : ""}
            </p>
            <button
              className="button-more"
              onClick={() => setShowDiv(!showDiv)}
            >
              {showDiv ? "MORE" : "LESS"}
              <div className="circle">
                <img
                  className="arrow-icon"
                  src={showDiv ? arrowup : arrowdown}
                  alt="datunia"
                />
              </div>
            </button>
          </div>
        </div>
        {showDiv ? null : (
          <div className="row3">
            <div className="left-div">
              <h2 className="up-h1">CURRENT TIMEZONE</h2>
              <h1 className="h1-text">{data.time_zone}</h1>
              <h2 className="down-h2">Day of the year</h2>
              <h1 className="h1-text">{dayOfYear}</h1>
            </div>
            <div className="line"></div>
            <div className="right-div">
              <h2 className="up-h1">Day of the week</h2>
              <h1 className="h1-text">{dayOfWeak}</h1>
              <h2 className="down-h2">Week number</h2>
              <h1 className="h1-text">{numberOfWeeks}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
