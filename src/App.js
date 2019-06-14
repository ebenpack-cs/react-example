import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Posts from './posts/Posts';
import Count from './count/Count';

const App = () => (
    <Router>
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">React/Redux/Sagas Examples</h1>
                <Link to="/count">Count Example</Link> | <Link to="/posts">Posts Example</Link>
            </header>
            <div className="App-intro">
                <Route path="/count" component={Count} />
                <Route path="/posts" component={Posts} />
            </div>
        </div>
    </Router>
);

export default App;
