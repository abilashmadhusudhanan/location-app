import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import AddLocation from './pages/AddLocation';
import ListLocations from './pages/ListLocations';

function App() {
  return (
    <div className="App">
      <Link to="/add-location">Add</Link>{'  '}
      <Link to="/list-locations">List</Link>{'  '}
      <Routes>
        <Route exact path='/add-location' element={<AddLocation />} />
        <Route exact path='/list-locations' element={<ListLocations />} />
      </Routes>
    </div>
  );
}

export default App;
