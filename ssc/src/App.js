import React, { Component } from "react";

import { Router } from "@reach/router";
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import "./App.css";

class App extends Component {
  state = {
    username: null
  };

  handleUpdateUser = username => {
    this.setState({ username });
  };
  render() {
    const { username } = this.state;
    return (
      <div className="App">
        <Router>
          <Home path="/" handleUpdateUser={this.handleUpdateUser} />
          <UserDashboard path="/dashboard" username={username} />
        </Router>
      </div>
    );
  }
}

export default App;
