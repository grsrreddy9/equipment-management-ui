import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {CreateEquipmentPage, Home, LogBookPage, CreateBatch} from './pages';

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
          <Route path="/create-batch">
            <CreateBatch />
          </Route>
          <Route path="/logbook">
            <LogBookPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
