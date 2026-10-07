import React from 'react'
import sleepyRidge from '../img/sleepy-ridge.jpg';

export function Round() {
    return (
        <section>
            <div className="floating-box">

                <h2>Log a Round</h2>

                <div className="log-flex">

                    <form className="log-form">

                        <label>
                            Date:
                            <input type="date" name="date" required />
                        </label>

                        <label>
                            Course:
                            <input type="text" name="course" placeholder="e.g. Sleepy Ridge" required />
                        </label>

                        <label>
                            Score:
                            <input type="number" name="score" placeholder="e.g. 75" required />
                        </label>

                        <label>
                            Fairways Hit (%):
                            <input type="number" name="fairways" placeholder="e.g. 75" min="0" max="100" />
                        </label>

                        <label>
                            Putts:
                            <input type="number" name="putts" placeholder="e.g. 32" />
                        </label>

                        <button type="submit" className="btn btn-dark roundly-btn">Save Round</button>

                    </form>

                    <div className="log-image">
                        <img src={sleepyRidge} alt="Sleepy Ridge Clubhouse" />
                    </div>

                </div>

            </div>
        </section>
    )
}