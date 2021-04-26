import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {CreateEquipmentPage, Home} from './pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create-equipment">
            <CreateEquipmentPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
