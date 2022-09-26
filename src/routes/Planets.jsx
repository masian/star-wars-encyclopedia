import './../css/App.css';
import PlanetTable from '../components/PlanetTable';


// async function loadIntoTable(url, table) {
//   const tableHead = table.query()
// }

function Planets() {
  return (
    <main>
      <div className="Planets">
        <header className="App-header">
          <div>May The Force Be With You</div>
        </header>
        <div>
        </div>
        <div>
          <PlanetTable></PlanetTable>
        </div>
      </div>
    </main>
  );
}

export default Planets;
