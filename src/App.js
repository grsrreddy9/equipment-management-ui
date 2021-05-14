import {Switch, Route} from 'react-router-dom';
import {
  CreateEquipmentPage,
  Home,
  LogBookPage,
  CreateBatch,
  CleaningFormPage,
} from './pages';

function App() {
  return (
    <div className="App">
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
        <Route path="/cleaning-form">
          <CleaningFormPage />
        </Route>
        <Route path="/logbook">
          <LogBookPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
