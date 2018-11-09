import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    this.updateProjects();
  }

  updateProjects = () => {
    axios
      .get("http://localhost:9000/api/projects")
      .then(res => {
        this.setState({
          projects: res.data
        });
      })
      .catch(err => console.dir(err));
  };

  render() {
    return (
      <div className="App">
        <h3>Projects</h3>
        {this.state.projects.map(project => {
          return <p>{project.name}</p>
        })}
      </div>
    );
  }
}

export default App;
