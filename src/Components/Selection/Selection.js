import React, { useEffect, useState } from 'react'
import Movie from '../Movie/Movie'
import styles from './Selection.module.css'
import Selected from '../../Context/Selected/Selected'

export default function Selection() {
    const [movies, setMovies] = useState([])
    const [pagination, setPagination] = useState(0)
    const [selection, setSelection] = useState([])

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

    const addToSelection = (title, poster) => {
        if (selection.length >= 3) {
            alert("You can't choose more than 3 movies")
            return;
        }
        if (selection.length === 0) {
            setSelection([title, poster])
        }
        setSelection([...selection, {title, poster}])
    }

    const removeFromSelection = (title, poster) => {
        setSelection(selection.filter(movie => movie.title !== title && movie.poster !== poster))
    }

    // TODO: figure out what's wrong with ESLint and this line, since ESLint suggestion results in useEffect being called in an infinite loop
    // eslint-disable-next-line
    useEffect(() => fetchMovies(pagination), [])

    return (
        <Selected.Provider value={{
            selection: selection,
            addToSelection: addToSelection,
            removeFromSelection: removeFromSelection,
        }}>
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
        </Selected.Provider>
    )
}
