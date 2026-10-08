import React from "react"
import golfBall from "../img/golf-ball-tee.jpg";

export function Home() {
    return (
        <section>
            <div className="floating-box">

                <div className="flex-container">
                    <img src={golfBall} alt="Golf Ball" className="flex-image" />

                    <div className="flex-text">
                        <h1>Track your game</h1>
                        <h1>Lower your scores</h1>
                        <p>By Bjorn Gray</p>
                    </div>
                </div>

                <hr />

                <div className="button-stats-container">
                    <div className="quick-stats">
                        <h2>Quick Stats</h2>
                        <p><strong>Avg Score:</strong> 75</p>
                        <p><strong>Fairways:</strong> 75%</p>
                        <p><strong>Putts Avg:</strong> 34</p>
                    </div>
                </div>

                <div className="video-container">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/gLeW6MNoB4U" title="Golf Video" allowFullScreen rel="noreferrer">
                    </iframe>
                </div>

                <aside className="weather-container">
                    <h2>Weather Warning</h2>
                    <div className="weather-text">
                        Snowstorms in the area, book earlier tee times...
                    </div>
                    <a href="https://weather.com/weather/today/l/4f9c2cccc24c9501d3ec21022cc060ea99dc40a0bca3c62398d61f6be6620f8c"
                        target="_blank" rel="noreferrer">
                        Check Weather
                    </a>
                </aside>

            </div>
        </section>
    )
}