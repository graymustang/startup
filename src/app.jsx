import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Courses } from "./courses/courses";
import { Gallery } from "./gallery/gallery";
import { Round } from "./round/round";
import { Stats } from "./stats/stats";

export default function App() {
    return (
        <BrowserRouter>
            <body>
                <header className="site-header">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">

                            <a className="navbar-brand" href="index.html">Roundly</a>

                            <div className="navbar-nav">
                                <a className="nav-link" href="index.html">Home</a>
                                <a className="nav-link" href="round.html">Log a Round</a>
                                <a className="nav-link" href="stats.html">Stats</a>
                                <a className="nav-link" href="courses.html">Find a Course</a>
                                <a className="nav-link" href="gallery.html">Photo Gallery</a>
                                <a className="nav-link" href="login.html">Login</a>
                            </div>

                        </div>
                    </nav>
                </header>
                <main>
                    <section>
                        <div className="floating-box">

                            <div className="flex-container">
                                <img src="img/golf-ball-tee.jpg" alt="Golf Ball" className="flex-image" />

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
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/gLeW6MNoB4U" title="Golf Video"
                                    allowFullScreen>
                                </iframe>
                            </div>

                            <aside className="weather-container">
                                <h2>Weather Warning</h2>
                                <div className="weather-text">
                                    Snowstorms in the area, book earlier tee times...
                                </div>
                                <a href="https://weather.com/weather/today/l/4f9c2cccc24c9501d3ec21022cc060ea99dc40a0bca3c62398d61f6be6620f8c"
                                    target="_blank">
                                    Check Weather
                                </a>
                            </aside>

                        </div>
                    </section>
                </main>

                <footer>
                    Bjorn Gray |
                    GitHub:
                    <a href="https://github.com/graymustang/startup" target="_blank">
                        https://github.com/graymustang/startup
                    </a>
                </footer>
            </body>
        </BrowserRouter>
    )
}