
import React, { useState, useEffect } from "react"

import sleepyRidge from "../img/sleepy-ridge.jpg"
import redRock from "../img/red-rock-golf-trail.jpg"
import riverside from "../img/riverside-golf-course.jpg"
import timp from "../img/timp-golf-course.jpg"
import foxHollow from "../img/sunset-fox-hollow.webp"

//Original photos
const defaultPhotos = [
    { id: 'sleepy', src: sleepyRidge, caption: 'Sleepy Ridge' },
    { id: 'redrock', src: redRock, caption: 'Red Rock Golf Trail' },
    { id: 'riverside', src: riverside, caption: 'Riverside Country Club' },
    { id: 'timp', src: timp, caption: 'Pond at Timpanogos Golf Course' },
    { id: 'fox', src: foxHollow, caption: 'Sunset at Fox Hollow' },
];

const storagekey = 'roundlyGalleryPhotos'
const MAX_FILE_SIZE = 250 * 1024
const MAX_UPLOADS = 8

export function Gallery() {
    const [photos, setPhotos] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(storagekey) || '[]')
            return Array.isArray(saved) ? saved : []
        } catch {
            return []
        }
    })

    const [caption, setCaption] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [message, setMessage] = useState('')

    //Save gallery changes to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(storagekey, JSON.stringify(photos));
        } catch {
            setMessage('Browser storage is full. Your changes may not persist')
        }
    }, [photos])

    function handleUpload(event) {
        event.preventDefault()

        if (!selectedFile) {
            setMessage('Please select a photo first')
            return
        }

        if (!selectedFile.type.startsWith("image/")) {
            setMessage('Please choose an image file.')
            return
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setMessage('Please choose a photo smaller than 250 KB')
            return
        }

        if (photos.length >= MAX_UPLOADS) {
            setMessage('You can upload up to 8 photos')
            return
        }
        const reader = new FileReader()

        reader.onload = () => {
            const newPhoto = {
                id: crypto.randomUUID(),
                src: reader.result,
                caption: caption.trim() || selectedFile.name,
            }

            setPhotos((previous) => [...previous, newPhoto])
            setCaption('')
            setSelectedFile(null)
            setMessage('Photo added successfully!')
        }

        reader.onerror = () => {
            setMessage('Could not read the selected photo')
        }

        reader.readAsDataURL(selectedFile)
    }

    function deletePhoto(id) {
        setPhotos((previous) =>
            previous.filter((photo) => photo.id !== id)
        )
        setMessage('Photo deleted')
    }

    const allPhotos = [...defaultPhotos, ...photos]

    return (
        <section id="gallery">
            <h2>Photo Gallery</h2>

            <p>
                Share your favorite golf photos
            </p>
            <div className="gallery-upload">
                <h3>Add a Photo</h3>

                <form onSubmit={handleUpload}>
                    <label htmlFor="photo-file">
                        Choose Photo
                    </label>

                    <input
                        id="photo-file"
                        type="file"
                        accept="image/*"
                        key={selectedFile ? "selected" : "empty"}
                        onChange={(event) =>
                            setSelectedFile(event.target.files[0] || null)
                        }
                    />
                    <label htmlFor="photo-caption">
                        Photo Caption
                    </label>
                    <input
                        id="photo-caption"
                        type="text"
                        placeholder="Example: My first hole-in-one"
                        maxLength={100}
                        value={caption}
                        onChange={(event) =>
                            setCaption(event.target.value)
                        }
                    />

                    <button type="submit">
                        Upload Photo
                    </button>
                </form>

                <p className="gallery-hint">
                    Maximum 250 KB per photo, up to 8 uploads.
                </p>

                {message && (
                    <p className="gallery-message" role="status">
                        {message}
                    </p>
                )}
            </div>

            <h3>Golf Memories</h3>

            <p>{allPhotos.length} total photos</p>

            <div className="gallery-container">
                {allPhotos.map((photo) => (
                    <figure
                        className="gallery-item"
                        key={photo.id}
                    >
                        <img
                            src={photo.src}
                            alt={photo.caption}
                        />

                        <figcaption>
                            {photo.caption}
                        </figcaption>

                        {!defaultPhotos.some(
                            (original) => original.id === photo.id
                        ) && (
                            <button
                                type="button"
                                className="gallery-delete"
                                onClick={() => deletePhoto(photo.id)}
                                aria-label={`Delete ${photo.caption}`}
                            >
                                Delete Photo
                            </button>
                        )}
                    </figure>
                ))}
            </div>
        </section>
    );
}