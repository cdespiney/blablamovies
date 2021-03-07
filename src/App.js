import React, { useRef } from 'react';
import './App.css';
import Landing from './Components/Landing/Landing';
import Selection from './Components/Selection/Selection'

function App() {
    const sel = useRef();

    const scrollToSel = (ref) => window.scrollTo(0, ref.current.offsetTop)

    return (
        <div className="App">
            <header className="App-header">
                <Landing clicked={() => scrollToSel(sel)}/>
                <Selection reference={sel} />
            </header>
        </div>
    );
}

export default App;
