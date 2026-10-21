import { useEffect, useState } from 'react'
import golfBall from '../img/golf-ball-tee.jpg'

const STORAGE_KEY = 'roundlyRounds'

function loadRounds() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        return Array.isArray(data) ? data : []
    } catch {
        return []
    }
}

function average(values) {
    if (values.length === 0) return '—'
    return (values.reduce((total, value) => total + value, 0)/values.length).toFixed(1)
}

export function Home() {
    const [rounds, setRounds] = useState([]);

    useEffect(() => {
        function refreshRounds() {setRounds(loadRounds())}

        refreshRounds()
        //also refresh if saved rounds change in another tab
        window.addEventListener('storage', refreshRounds)
        window.addEventListener('focus', refreshRounds)
        return () => {
            window.removeEventListener('storage', refreshRounds)
            window.removeEventListener('focus', refreshRounds)
        }
    }, [])

    const scores = rounds.map((round) => Number(round.score)).filter((value) => Number.isFinite(value) && value > 0)
    const fairways = rounds.map((round) => round.fairways).filter((value) => value !== null && value !== '' && value !== undefined).map(Number).filter(Number.isFinite)
    const putts = rounds.map((round) => round.putts).filter((value) => value !== null && value !== '' && value !== undefined).map(Number).filter(Number.isFinite)

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
                        <p><strong>Avg Score:</strong> {average(scores)}</p>
                        <p><strong>Fairways:</strong> {fairways.length ? `${average(fairways)}%` : '—'}</p>
                        <p><strong>Putts Avg:</strong> {average(putts)}</p>
                        <p><strong>Rounds Logged:</strong> {rounds.length}</p>
                        {rounds.length === 0 && <p>Log your first round to see your stats!</p>}
                    </div>
                </div>

                <div className="video-container">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/gLeW6MNoB4U"
                        title="Golf Video"
                        allowFullScreen
                        rel="noreferrer"
                    />
                </div>

                <aside className="weather-container">
                    <h2>Weather Warning</h2>
                    <div className="weather-text">
                        Snowstorms in the area, book earlier tee times...
                    </div>
                    <a
                        href="https://weather.com/weather/today/l/4f9c2cccc24c9501d3ec21022cc060ea99dc40a0bca3c62398d61f6be6620f8c"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Check Weather
                    </a>
                </aside>
            </div>
        </section>
    );
}