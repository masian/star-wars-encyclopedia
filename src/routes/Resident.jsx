import StarWarsHeader from '../components/StarWarsHeader';
import { Link } from "react-router-dom";
import ResidentProfile from '../components/ResidentProfile';
import "./../css/PlanetTable.css";



export default function Resident(props) {
    return(
        <main>  
            <div className="Resident">
                <StarWarsHeader/>
                <div>
                    <ResidentProfile></ResidentProfile>
                </div>
            </div>        
      </main>
    );
}