import React from "react";

export function Stats() {
    return (
        <section id="stats">
            <h2>My Stats</h2>

            <div className="stats-cards">

                <div className="stat-card">
                    <h3>Average Score</h3>
                    <p>75</p>
                </div>

                <div className="stat-card">
                    <h3>Fairways Hit</h3>
                    <p>75%</p>
                </div>

                <div className="stat-card">
                    <h3>Average Putts</h3>
                    <p>34</p>
                </div>

                <div className="stat-card">
                    <h3>GIR</h3>
                    <p>66%</p>
                </div>

            </div>

            <p>More stats will be added as you save rounds...</p>

            <div className="stats-chart-container">
                <div className="stats-chart">

                    <h3>Recent Rounds</h3>

                    <div className="chart-bars">
                        <div className="bar" style={{ height: "65%" }}><span>74</span></div>
                        <div className="bar" style={{ height: "70%" }}><span>75</span></div>
                        <div className="bar" style={{ height: "55%" }}><span>72</span></div>
                        <div className="bar" style={{ height: "80%" }}><span>78</span></div>
                        <div className="bar" style={{ height: "60%" }}><span>73</span></div>
                    </div>

                </div>
            </div>

            <hr />

            <h2>Saved Rounds</h2>

            <p>
                These rounds represent data that will be stored in the database.
            </p>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Course</th>
                        <th>Score</th>
                        <th>Fairways</th>
                        <th>Putts</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>09/15/2026</td>
                        <td>Sleepy Ridge</td>
                        <td>74</td>
                        <td>79%</td>
                        <td>32</td>
                    </tr>

                    <tr>
                        <td>09/10/2026</td>
                        <td>Sleepy Ridge</td>
                        <td>75</td>
                        <td>71%</td>
                        <td>34</td>
                    </tr>

                    <tr>
                        <td>09/05/2026</td>
                        <td>Oglebay</td>
                        <td>72</td>
                        <td>79%</td>
                        <td>31</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            <h2>Live Round Updates</h2>

            <p>
                Live updates from other Roundly golfers will appear here.
            </p>

            <div className="live-updates">
                <p><strong>Jake:</strong> Just finished a round at Oglebay - 73</p>
                <p><strong>Sam:</strong> Just finished a round at Sleepy Ridge - 76</p>
                <p><strong>Alex:</strong> Just finished a round at Stonewall Resort - 71</p>
            </div>

        </section>
    )
}