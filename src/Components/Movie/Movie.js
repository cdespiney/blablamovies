import React, { useContext } from 'react'
import Selected from '../../Context/Selected/Selected'
import styles from './Movie.module.css'


export default function Movie(props) {
    const { selection, addToSelection, removeFromSelection } = useContext(Selected)

    const isSelected = ( selection.find(e => e.imdbID === props.id))

    const handleSelection = (e) => {
        e.preventDefault()
        if (!isSelected) {
            addToSelection(props.title, props.poster, props.id)
        } else {
            removeFromSelection(props.title, props.poster, props.id)
        }
    }

    return (
        <div className={styles.movie} onClick={handleSelection}>
            <img src={(props.poster !== "N/A" ? props.poster : `https://place-hold.it/300x450/ffffff/000000&text=N\\A&fontsize=36`)} alt={`Poster for ${props.title}`} className={styles.poster} />
            <p>{props.title}</p>
        </div>
    )
}
