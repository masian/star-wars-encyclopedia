import './../css/App.css';
import PlanetTable from '../components/PlanetTable';
import StarWarsHeader from '../components/StarWarsHeader';
import { Breadcrumbs, Typography } from '@material-ui/core';
import './../css/PlanetTable.css';

function Planets() {
  return (
    <main>
      <div className="Planets">
        <StarWarsHeader/>
        <div>
          <Breadcrumbs class="center" aria-label="breadcrumb">
            <Typography color="textPrimary">All Planets</Typography>
          </Breadcrumbs>
          <PlanetTable/>
        </div>
      </div>
    </main>
  );
}

export default Planets;
