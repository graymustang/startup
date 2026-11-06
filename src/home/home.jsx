import { useEffect, useState } from 'react'
import golfBall from '../img/golf-ball-tee.jpg'

function average(values) {
    if (values.length === 0) return '—'
    return (values.reduce((total, value) => total + value, 0)/values.length).toFixed(1)
}

export function Home() {
    const [rounds, setRounds] = useState([]);
    const [weather, setWeather] = useState(null)
    const [weatherError, setWeatherError] = useState('')

    
    useEffect(() => {
        async function loadRounds() {
            try {
                const response = await fetch('/api/rounds')

                if (response.status === 401) {
                    setRounds([])
                    return
                }

                if (!response.ok) {
                    throw new Error('Failed to load rounds')
                }

                const savedRounds = await response.json()
                setRounds(savedRounds)
            } catch (error) {
                console.error('Unable to load rounds:', error)
                setRounds([])
            }
        }

        loadRounds()
    }, [])
    
    
useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
        try {
            const response = await fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=40.2338&longitude=-111.6585&current=temperature_2m,precipitation,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph',
                { signal: controller.signal }
            );

            if (!response.ok) {
                throw new Error('Weather request failed');
            }

            const data = await response.json();

            if (!controller.signal.aborted) {
                setWeather(data.current);
                setWeatherError('');
            }
        } catch (error) {
            if (!controller.signal.aborted) {
                console.error('Weather error:', error);
                setWeatherError('Unable to load weather information.');
            }
        }
    }

    loadWeather();

    return () => controller.abort();
}, []);




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
                    <h2>Golf Weather — Provo, Utah</h2>

                    <div className="weather-text">
                        {weatherError ? (
                            <p>{weatherError}</p>
                        ) : weather ? (
                            <>
                                <p>Temperature: {weather.temperature_2m}°F</p>
                                <p>Wind Speed: {weather.wind_speed_10m} mph</p>
                                <p>Precipitation: {weather.precipitation} mm</p>
                        
                                {weather.precipitation > 0 && (
                                    <p>Rain or snow detected. Check conditions before golfing</p>
                                )}

                                {weather.wind_speed_10m > 20 && (
                                    <p>Strong winds may affect your golf game.</p>
                                )}
                            </>
                        ) : (
                            <p>Loading weather...</p>
                        )}
                    </div>
                    <a
                        href="https://open-meteo.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Weather data provided by Open-Meteo
                    </a>
                </aside>
            </div>
        </section>
    );
}