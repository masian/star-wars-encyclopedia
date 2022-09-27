import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import { Breadcrumbs, CardContent, Typography } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import './../css/PlanetTable.css';

const swapiPeopleUrl = 'https://swapi.dev/api/people/';

/* This is a higher order component that 
*  inject a special prop   to our component.
*/ 
function withRouter(Component) {
    function ComponentWithRouter(props) {
      let params = useParams()
      return <Component {...props} params={params} />
    }
    return ComponentWithRouter
}

function PersonalInfo(props) {
    const resident = props.value;
    return (
      <div class="center">
        <Box sx={{ minWidth: 275 }}>
          <Card>
            <CardContent>
              <div>
                <h2>Resident: {resident.name}</h2>
              </div>
              <div>Height: {resident.height}</div>
              <div>Mass: {resident.mass}</div>
              <div>Hair Color: {resident.hair_color}</div>
              <div>Skin Color: {resident.skin_color}</div>
              <div>Eye Color: {resident.eye_color}</div>
              <div>Birth Year: {resident.birth_year}</div>
              <div>Gender: {resident.gender}</div>
              <div>Homeworld: {resident.homeworld}</div>
              <div>Species: {resident.species ? resident.species.join(", ") : resident.species}</div>
              <div>Vehicles: {resident.vehicles ? resident.vehicles.join(", ") : resident.vehicles}</div>
              <div>Starships: {resident.starships ? resident.starships.join(", ") : resident.starships}</div>
            </CardContent>
          </Card>
        </Box>
      </div>
    );
}

class ResidentProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      planet: this.props.params.id,
      residentId: this.props.params.rid,
      resident: {}
    }
  }

  async componentDidMount() {
    const response =  await fetch(swapiPeopleUrl + this.state.residentId);
    const resident =  await response.json();
    
    this.setState({
      resident: resident
    });
  }

  render() {
    return (
    <Paper>
        <Breadcrumbs class="center" aria-label="breadcrumb">
          <Link color="inherit" to="/">
              Planets
          </Link>
          <Link color="inherit" to={"/planets/"+this.state.planet+"/residents"}>
              Residents
          </Link>
          <Typography color="textPrimary">Resident</Typography>
                    </Breadcrumbs>
        <PersonalInfo value={this.state.resident}/>
    </Paper>

    );
  }
} 
export default withRouter(ResidentProfile);