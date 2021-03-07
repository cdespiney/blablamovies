import React from 'react'
import Movie from '../Movie/Movie'
import styles from './MovieList.module.css'

export default function MovieList({ movies }) {
    return (
        <div className={styles.flexbox}>
            {movies.map((movie) => (
                <Movie
                    title={movie.Title}
                    poster={movie.Poster}
                    id={movie.imdbID}
                    key={movie.imdbID}
                />
            ))}
        </div>
    )
}
