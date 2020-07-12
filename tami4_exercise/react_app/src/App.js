import './App.scss';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CandidatePage from './pages/CandidatePage';

function App() {
  return (
    <Router>
      <div className="main-container">
        <Switch>
          <Route exact path="/" >
            <SignInPage/>
          </Route>
          <Route exact path="/home">
            <HomePage/>
          </Route>
          <Route exact path="/candidate/:id">
            <CandidatePage/>
          </Route>
          <Route exact path="/signup">
            <SignUpPage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
