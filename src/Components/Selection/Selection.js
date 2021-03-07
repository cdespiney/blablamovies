import React, { useState } from 'react'
import Movie from '../Movie/Movie'
import styles from './Selection.module.css'
import Selected from '../../Context/Selected/Selected'

export default function Selection({ reference }) {
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

    const addToSelection = (title, poster, id) => {
        if (selection.length >= 3) {
            alert("You can't choose more than 3 movies")
            return;
        }
        if (selection.length === 0) {
            setSelection([{ title, poster, id }])
        } else {
            setSelection([...selection, { title, poster, id }])
        }
    }

    const removeFromSelection = (title, poster, id) => {
        setSelection(selection.filter(movie => movie.title !== title && movie.poster !== poster && movie.id !== id))
    }

    const handleSearch = () => {
        fetchMovies(true)
    }

    return (
        <Selected.Provider value={{
            selection: selection,
            addToSelection: addToSelection,
            removeFromSelection: removeFromSelection,
        }}>
            <div className={styles.selection}>
                <div ref={reference} className={styles.searchbox}>
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
                <div>
                    {selection.map(e => (
                        <div>
                            {e.title}
                        </div>
                    ))}
                </div>
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
                {movies.length !== 0 &&
                    <button onClick={() => fetchMovies(false)} className={[styles.button, styles.more].join(" ")}>
                        Load more
                    </button>
                }
            </div>
        </Selected.Provider>
    )
}
