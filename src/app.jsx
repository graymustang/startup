import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import { Login } from "./login/login";
import { Courses } from "./courses/courses";
import { Gallery } from "./gallery/gallery";
import { Round } from "./round/round";
import { Stats } from "./stats/stats";
import { Home } from "./home/home";

export default function App() {
    return (
        <BrowserRouter>

            <header className="site-header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">

                        <NavLink className="navbar-brand" to="/">
                            Roundly
                        </NavLink>

                        <div className="navbar-nav">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>

                            <NavLink className="nav-link" to="/round">
                                Log a Round
                            </NavLink>

                            <NavLink className="nav-link" to="/stats">
                                Stats
                            </NavLink>

                            <NavLink className="nav-link" to="/courses">
                                Find a Course
                            </NavLink>

                            <NavLink className="nav-link" to="/gallery">
                                Photo Gallery
                            </NavLink>

                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </div>

                    </div>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/round" element={<Round />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>

            <footer>
                Bjorn Gray | GitHub:{" "}
                <a
                    href="https://github.com/graymustang/startup"
                    target="_blank"
                    rel="noreferrer"
                >
                    https://github.com/graymustang/startup
                </a>
            </footer>

        </BrowserRouter>
    );
}