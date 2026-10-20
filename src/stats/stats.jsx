import { useEffect, useState } from 'react';

const STORAGE_KEY = 'roundlyRounds';

function loadRounds() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}
function average(values) {
    if (values.length === 0) return '—';
    return (values.reduce((total, value) => total + value, 0) / values.length).toFixed(1);
}

function formatDate(dateString) {
    // Avoid timezone shifts caused by parsing YYYY-MM-DD as UTC.
    const parts = String(dateString || '').split('-');
    if (parts.length !== 3) return dateString || '—';
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
}

export function Stats() {
    const [rounds, setRounds] = useState([]);

    useEffect(() => {
        //load rounds when the Stats page opens.
        setRounds(loadRounds());
    }, []);

    const sortedRounds = [...rounds].sort((a, b) =>
        String(b.date || '').localeCompare(String(a.date || ''))
    );

    const scores = rounds.map((round) => Number(round.score)).filter((value) => Number.isFinite(value) && value > 0);
    const fairways = rounds.map((round) => round.fairways).filter((value) => value !== null && value !== '' && value !== undefined).map(Number).filter(Number.isFinite);
    const putts = rounds.map((round) => round.putts).filter((value) => value !== null && value !== '' && value !== undefined).map(Number).filter(Number.isFinite);

    //show the five recent rounds
    const recentRounds = sortedRounds.slice(0, 5).reverse();
    const highestScore = Math.max(1, ...recentRounds.map((round) => Number(round.score) || 0));

    return (
        <section id="stats">
            <h2>My Stats</h2>

            <div className="stats-cards">
                <div className="stat-card">
                    <h3>Average Score</h3>
                    <p>{average(scores)}</p>
                </div>
                <div className="stat-card">
                    <h3>Fairways Hit</h3>
                    <p>{fairways.length ? `${average(fairways)}%` : '—'}</p>
                </div>
                <div className="stat-card">
                    <h3>Average Putts</h3>
                    <p>{average(putts)}</p>
                </div>
                <div className="stat-card">
                    <h3>Rounds Logged</h3>
                    <p>{rounds.length}</p>
                </div>
            </div>

            <p>These stats are calculated from the golf rounds you've saved in this browser.</p>
            <div className="stats-chart-container">
                <div className="stats-chart">
                    <h3>Recent Rounds</h3>
                    {recentRounds.length === 0 ? (
                        <p>No scores yet. Log a round to see your chart.</p>
                    ) : (
                        <div className="chart-bars">
                            {recentRounds.map((round, index) => (
                                <div
                                    className="bar"
                                    key={`${round.date}-${round.course}-${index}`}
                                    style={{ height: `${Math.max(10, (Number(round.score) / highestScore) * 85)}%` }}
                                    title={`${round.course} — ${formatDate(round.date)}: ${round.score}`}
                                >
                                    <span>{round.score}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <hr />
            <h2>Saved Rounds</h2>
            <p>Your saved rounds are stored locally until the backend is built</p>
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
                    {sortedRounds.length === 0 ? (
                        <tr><td colSpan="5">No rounds saved yet. Visit Log a Round to add one.</td></tr>
                    ) : (
                        sortedRounds.map((round, index) => (
                            <tr key={`${round.date}-${round.course}-${index}`}>
                                <td>{formatDate(round.date)}</td>
                                <td>{round.course}</td>
                                <td>{round.score}</td>
                                <td>{round.fairways == null ? '—' : `${round.fairways}%`}</td>
                                <td>{round.putts == null ? '—' : round.putts}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <hr />
            <h2>Live Round Updates</h2>
            <p>Sample updates from other Roundly golfers (mock data - but this will be websocket).</p>
            <div className="live-updates">
                <p><strong>Jake:</strong> Just finished a round at Oglebay - 73</p>
                <p><strong>Sam:</strong> Just finished a round at Sleepy Ridge - 76</p>
                <p><strong>Alex:</strong> Just finished a round at Stonewall Resort - 71</p>
            </div>
        </section>
    );
}
