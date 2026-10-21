
import React, { useState, useEffect } from "react";

//Mock course data 
const golfCourses = [
    {
        id: 1,
        name: 'Sleepy Ridge Golf Course',
        city: 'Orem',
        state:'Utah',
    },
    {
        id: 2,
        name: 'Thanksgiving Point Golf Club',
        city: 'Lehi',
        state: 'Utah',
    },
    {
        id: 3,
        name: 'Hobble Creek Golf Course',
        city: 'Springville',
        state: 'Utah',
    },
    {
        id: 4,
        name: 'Fox Hollow Golf Course',
        city: 'American Fork',
        state: 'Utah',
    },
    {
        id: 5,
        name: 'Riverside Country Club',
        city: 'Provo',
        state: 'Utah',
    },
]

export function Courses() {
    const [search, setSearch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(() => {
        const savedId = Number(
            localStorage.getItem('selectedCourseId')
        )

        return golfCourses.find(
            (course) => course.id === savedId
        ) || golfCourses[0]
    })

    //Remember the last course
    useEffect(() => {
        localStorage.setItem('selectedCourseId', String(selectedCourse.id))
    }, [selectedCourse])

    const filteredCourses = golfCourses.filter((course) => {
        const query = search.trim().toLowerCase()

        return ( course.name.toLowerCase().includes(query) || course.city.toLowerCase().includes(query) || course.state.toLowerCase().includes(query))
    })
    function handleSearch(event) {
        event.preventDefault()
        if (filteredCourses.length > 0) {
            setSelectedCourse(filteredCourses[0])
        }
    }
    function selectCourse(course) {
        setSelectedCourse(course)
    }

    const mapLocation = encodeURIComponent(
        `${selectedCourse.name}, ${selectedCourse.city}, ${selectedCourse.state}`
    )

    return (
        <section id="courses">
            <h2>Find a Course</h2>

            <p>Search for a golf course by city or course name.</p>

            <form
                className="course-search"
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    placeholder="Search by city or course name..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                <button type="submit">Search</button>
            </form>

            <section>
                <h3>Course Map</h3>

                <p>
                    Showing: <strong>{selectedCourse.name}</strong>
                </p>

                <div className="map-container">
                    <iframe
                        title={`Map of ${selectedCourse.name}`}
                        src={`https://www.google.com/maps?q=${mapLocation}&output=embed`}
                        width="600"
                        height="400"
                        style={{
                            border: 0,
                            maxWidth: "100%",
                        }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>

            <section className="course-results">
                <h3>Course Results</h3>

                <p>
                    {filteredCourses.length} course(s) found
                </p>

                {filteredCourses.length === 0 ? (
                    <p>
                        No courses found. Try another name or city.
                    </p>
                ) : (
                    <div className="course-list">
                        {filteredCourses.map((course) => (
                            <div
                                className="course-card"
                                key={course.id}
                            >
                                <h4>{course.name}</h4>

                                <p>
                                    {course.city}, {course.state}
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        selectCourse(course)
                                    }
                                >
                                    View on Map
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </section>
    );
}