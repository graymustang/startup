import React from "react";

import sleepyRidge from "../img/sleepy-ridge.jpg";
import redRock from "../img/red-rock-golf-trail.jpg";
import riverside from "../img/riverside-golf-course.jpg";
import timp from "../img/timp-golf-course.jpg";
import foxHollow from "../img/sunset-fox-hollow.webp";

export function Gallery() {
    return (
        <section id="gallery">
            <h2>Photo Gallery</h2>

            <p>Photos from golf courses and rounds will be displayed here.</p>

            <div className="gallery-container">

                <figure className="gallery-item">
                    <img src={sleepyRidge} alt="Sleepy Ridge Course" />
                    <figcaption>Sleepy Ridge</figcaption>
                </figure>

                <figure className="gallery-item">
                    <img src={redRock} alt="Red Rock Golf Trail" />
                    <figcaption>Red Rock Golf Trail</figcaption>
                </figure>

                <figure className="gallery-item">
                    <img src={riverside} alt="Riverside green" />
                    <figcaption>Riverside Country Club</figcaption>
                </figure>

                <figure className="gallery-item">
                    <img src={timp} alt="Timp Golf Course" />
                    <figcaption>Pond at Timpanogos Golf Course</figcaption>
                </figure>

                <figure className="gallery-item">
                    <img src={foxHollow} alt="Fox Hollow" />
                    <figcaption>Sunset at Fox Hollow</figcaption>
                </figure>

            </div>
        </section>
    );
}