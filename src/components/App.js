import './../css/App.css';
import PlanetTable from './PlanetTable';


// async function loadIntoTable(url, table) {
//   const tableHead = table.query()
// }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>May The Force Be With You</div>
      </header>
      <div>
        <PlanetTable></PlanetTable>
      </div>
    </div>
  );
}

export default App;
