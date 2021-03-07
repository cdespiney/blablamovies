import React, { useState } from 'react'
import Movie from '../Movie/Movie'
import styles from './Selection.module.css'
import Selected from '../../Context/Selected/Selected'

export default function Selection({reference}) {
    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [pagination, setPagination] = useState(0)
    const [selection, setSelection] = useState([])

    const fetchMovies = (clear) => {
        fetch(`http://www.omdbapi.com/?s=${query}&apikey=d579f432${(pagination !== 0 && !clear) ? `&page=${pagination}` : ''}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    setPagination((!clear ? pagination + 1 : 1))
                    if (clear) {
                        setMovies([...data.Search])
                    } else {
                        setMovies([...movies, ...data.Search])
                    }
                }
            })
    }

    const addToSelection = (title, poster) => {
        if (selection.length >= 3) {
            alert("You can't choose more than 3 movies")
            return;
        }
        if (selection.length === 0) {
            setSelection([{title, poster}])
        } else {
            setSelection([...selection, { title, poster }])
        }
    }

    const removeFromSelection = (title, poster) => {
        setSelection(selection.filter(movie => movie.title !== title && movie.poster !== poster))
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
            <div ref={reference}>
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                {selection.map(e => (
                    <div>
                        {e.title}
                    </div>
                ))}
            </div>
            <div className={styles.selection}>
                {movies.map((movie) => (
                    <Movie
                        title={movie.Title}
                        poster={movie.Poster}
                        key={movie.imdbID}
                    />
                ))}
            </div>
            {movies.length !== 0 && <button onClick={() => fetchMovies(false)}>Load more</button>}
        </Selected.Provider>
    )
}
