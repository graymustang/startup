import { useEffect, useState } from "react";
import sleepyRidge from "../img/sleepy-ridge.jpg";

const emptyRound = {
  date: "",
  course: "",
  score: "",
  fairways: "",
  putts: "",
};

export function Round() {
  const [round, setRound] = useState(emptyRound);
  const [message, setMessage] = useState("");
  const [savedCount, setSavedCount] = useState(0);

  //load the number of saved rounds when page opens
  useEffect(() => {
    async function loadRounds() {
      try {
        const response = await fetch("/api/rounds");

        if (!response.ok) {
          throw new Error("Unable to load rounds");
        }

        const savedRounds = await response.json();
        setSavedCount(savedRounds.length);
      } catch {
        setSavedCount(0);
      }
    }

    loadRounds();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setRound((previous) => ({ ...previous, [name]: value }));
    setMessage("");
  }

  
async function handleSubmit(event) {
    event.preventDefault();

    const newRound = {
        date: round.date,
        course: round.course.trim(),
        score: Number(round.score),
        fairways: round.fairways === '' ? null : Number(round.fairways),
        putts: round.putts === '' ? null : Number(round.putts),
    };

    if (
        !newRound.course ||
        !newRound.date ||
        !Number.isInteger(newRound.score) ||
        newRound.score <= 0
    ) {
        setMessage('Please enter a date, course, and valid score.');
        return
    }

    try {
        const response = await fetch('/api/rounds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRound),
        })

        if (!response.ok) {
            if (response.status === 401) {
                setMessage('Please log in before saving a round.')
                return
            }

            throw new Error('Failed to save round')
        }

        setSavedCount((previous) => previous + 1)
        setRound({ ...emptyRound });
        setMessage('Round saved successfully!')
    } catch {
        setMessage("Couldn't save your round.")
    }
}

  return (
    <section>
      <div className="floating-box">
        <h2>Log a Round</h2>
        <div className="log-flex">
          <form className="log-form" onSubmit={handleSubmit}>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={round.date}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Course:
              <input
                type="text"
                name="course"
                placeholder="e.g. Sleepy Ridge"
                value={round.course}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Score:
              <input
                type="number"
                name="score"
                placeholder="e.g. 75"
                min="1"
                step="1"
                value={round.score}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Fairways Hit (%):
              <input
                type="number"
                name="fairways"
                placeholder="e.g. 75"
                min="0"
                max="100"
                step="1"
                value={round.fairways}
                onChange={handleChange}
              />
            </label>
            <label>
              Putts:
              <input
                type="number"
                name="putts"
                placeholder="e.g. 32"
                min="0"
                step="1"
                value={round.putts}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn btn-dark roundly-btn">
              Save Round
            </button>
            {message && <p role="status">{message}</p>}
            <p>Saved rounds: {savedCount}</p>
          </form>
          <div className="log-image">
            <img src={sleepyRidge} alt="Sleepy Ridge Clubhouse" />
          </div>
        </div>
      </div>
    </section>
  );
}
