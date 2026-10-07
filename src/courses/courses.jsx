import React from "react";

export function Courses() {
    return (
        <section id="courses">
            <h2>Find a Course</h2>

            <p>Search for a golf course by city or course name.</p>

            <form className="course-search">
                <input
                    type="text"
                    placeholder="Search by city or course name..."
                    required
                />
                <button type="submit">Search</button>
            </form>
            <section>
                <h3>Course Map</h3>

                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps?q=Sleepy+Ridge+Golf+Course&output=embed"
                        width="600"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                </div>

                <p>Google Maps course information will be displayed here.</p>
            </section>

            <section className="course-results">
                <h3>Course Results</h3>
                <p>Popular nearby courses will show up here.</p>
            </section>
        </section>
    );
}