import StarWarsHeader from '../components/StarWarsHeader';
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from '@material-ui/core';
import ResidentProfile from '../components/ResidentProfile';
import "./../css/PlanetTable.css";



export default function Resident(props) {
    return(
        <main>  
            <div className="Resident">
                <StarWarsHeader/>
                    <Breadcrumbs class="center" aria-label="breadcrumb">
                        <Link color="inherit" to="/">
                            Planets
                        </Link>
                        {/* <Link color="inherit" to="/planets/:id/residents">
                            Residents
                        </Link>
                        <Typography color="textPrimary">Resident</Typography> */}
                    </Breadcrumbs>
                <div>
                    <ResidentProfile></ResidentProfile>
                </div>
            </div>        
      </main>
    );
}