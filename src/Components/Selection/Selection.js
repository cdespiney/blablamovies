import React, { useEffect, useState } from 'react'
import Movie from '../Movie/Movie'
import styles from'./Selection.module.css'

export default function Selection() {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        fetch("http://www.omdbapi.com/?s=pirate&apikey=d579f432")
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    console.log("Okay")
                }
                setMovies(data.Search)
            })
    }, [])

    return (
        <div className={styles.selection}>
            {movies.map((movie) => (
                <Movie
                    title={ movie.Title }
                    poster={ movie.Poster}
                    key={ movie.imdbID}
                />
            ))}
        </div>
    )
}
