import React, { useRef } from 'react';
import './App.css';
import Landing from './Components/Landing/Landing';
import Selection from './Components/Selection/Selection'

function App() {
    const sel = useRef();

    const scrollToSel = (ref) => window.scrollTo({
        left: 0,
        top: ref.current.offsetTop,
        behavior: 'smooth'
    })

    return (
        <div className="App">
            <header className="App-header">
                <Landing clicked={() => scrollToSel(sel)}/>
                <Selection reference={sel} scroll={() => scrollToSel(sel)} />
            </header>
        </div>
    );
}

export default App;
