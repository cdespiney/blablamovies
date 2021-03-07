import React, { useEffect, useState } from 'react'
import Movie from '../Movie/Movie'
import styles from './Selection.module.css'

export default function Selection() {
    const [movies, setMovies] = useState([])
    const [pagination, setPagination] = useState(0)

    const fetchMovies = (pagination) => {
        fetch(`http://www.omdbapi.com/?s=pirate&apikey=d579f432${pagination !== 0 ? `&page=${pagination}` : ''}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    setPagination(pagination + 1)
                }
                setMovies([...movies, ...data.Search])
            })
    }

    useEffect(() => {
        fetchMovies(pagination)
    }, [])

    return (
        <div>
            <div className={styles.selection}>
                {movies.map((movie) => (
                    <Movie
                        title={movie.Title}
                        poster={movie.Poster}
                        key={movie.imdbID}
                    />
                ))}
            </div>
            <button onClick={() => fetchMovies(pagination)}>Load more</button>
        </div>
    )
}
