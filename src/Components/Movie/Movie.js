import React from 'react'
import styles from './Movie.module.css'


export default function Movie(props) {
    return (
        <div className={styles.movie}>
            <img src={props.poster} alt={`Poster for ${props.title}`} />
            <p>{props.title}</p>
        </div>
    )
}
