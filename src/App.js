import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Navigation from './components/navigation/Navigation';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Container>
            <Route exact path="/" component={Home} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
