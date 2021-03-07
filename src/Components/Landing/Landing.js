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
                    Select your favorite pirate movie!
                </div>
            </div>
            <button onClick={() => {}}>Select now</button>
        </div>
    )
}


