import React from 'react'
import styles from './Landing.module.css'

export default function Landing(props) {

    return (
        <div className={styles.landing}>
            <div>
                <h1>
                    Blablamovie
                </h1>
                <div>
                    What are the best movies ever?
                </div>
                <div>
                    Vote! You can select up to 3 movies!
                </div>
                <div>
                    You can click on a movie to select it. Click again to unselect it.
                </div>
            </div>
            <div>
                Results next week!
            </div>
            <button onClick={props.clicked} className={styles.button}>Start choosing!</button>
        </div>
    )
}


