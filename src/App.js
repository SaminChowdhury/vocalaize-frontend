import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from './components/HomePage';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Navbar.Brand>VocalAIze</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link to={"#"}>About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <HomePage />
    </div>
  );
}

export default App;
