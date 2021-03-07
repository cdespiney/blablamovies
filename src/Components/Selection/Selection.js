import React, { useState } from 'react'
import styles from './Selection.module.css'
import Selected from '../../Context/Selected/Selected'
import MovieList from '../MovieList/MovieList'

export default function Selection({ reference, scroll }) {
    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [pagination, setPagination] = useState(1)
    const [selection, setSelection] = useState([])

    const fetchMovies = (clear) => {
        fetch(`http://www.omdbapi.com/?s=${query}&apikey=d579f432${(pagination !== 0 && !clear) ? `&page=${pagination}` : ''}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    setPagination((!clear ? pagination + 1 : 2))
                    if (clear) {
                        setMovies([...data.Search])
                    } else {
                        setMovies([...movies, ...data.Search])
                    }
                }
            })
    }

    const addToSelection = (Title, Poster, imdbID) => {
        if (selection.length >= 3) {
            alert("You can't choose more than 3 movies")
            return;
        }
        if (selection.length === 0) {
            setSelection([{ Title, Poster, imdbID }])
            scroll()
        } else {
            setSelection([...selection, { Title, Poster, imdbID }])
        }
    }

    const removeFromSelection = (Title, Poster, imdbID) => {
        setSelection(selection.filter(movie => movie.Title !== Title && movie.Poster !== Poster && movie.imdbID !== imdbID))
    }

    const handleSearch = () => {
        fetchMovies(true)
    }

    const handleVote = () => {
        alert("Thanks for participating!")
        // post to API here
    }

    return (
        <Selected.Provider value={{
            selection: selection,
            addToSelection: addToSelection,
            removeFromSelection: removeFromSelection,
        }}>
            <div className={styles.selection} ref={reference}>

                {selection.length !== 0 && <div>
                    <h2>You have chosen:</h2>
                    <MovieList movies={selection} />
                    <button className={[styles.button, styles.more].join(" ")} onClick={handleVote}>Vote!</button>
                </div>}

                <div className={styles.searchbox}>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === "Enter") handleSearch()
                        }}
                        className={styles.searchbar}
                    />
                    <button onClick={handleSearch} className={styles.button}>Search</button>
                </div>

                <MovieList movies={movies} />

                {movies.length !== 0 &&
                    <button
                        onClick={() => fetchMovies(false)}
                        className={[styles.button, styles.more].join(" ")}
                    >
                        Load more
                    </button>
                }
            </div>
        </Selected.Provider>
    )
}
