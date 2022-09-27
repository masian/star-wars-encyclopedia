import './../css/App.css';
import PlanetTable from '../components/PlanetTable';
import StarWarsHeader from '../components/StarWarsHeader';
import { Breadcrumbs, Typography } from '@material-ui/core';


// async function loadIntoTable(url, table) {
//   const tableHead = table.query()
// }

function Planets() {
  return (
    <main>
      <div className="Planets">
        <StarWarsHeader/>
        <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Planets</Typography>
        </Breadcrumbs>
        <PlanetTable/>
        </div>
      </div>
    </main>
  );
}

export default Planets;
