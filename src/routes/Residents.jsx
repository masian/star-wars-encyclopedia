import ResidentTable from '../components/ResidentTable';
import { Link } from "react-router-dom";
import StarWarsHeader from '../components/StarWarsHeader';
import { Breadcrumbs, Typography } from '@material-ui/core';
import "./../css/PlanetTable.css";


export default function Residents() {
    return(
    <main>  
        <div className="Residents">
            <StarWarsHeader/>
            <div>
                <Breadcrumbs class="center" aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Planets
                    </Link>
                    <Typography color="textPrimary">Residents</Typography>
                </Breadcrumbs>
                <ResidentTable id="residentTable"></ResidentTable>
            </div>
        </div>        
    </main>
    );
}