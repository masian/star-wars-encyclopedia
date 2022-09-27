import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Link, useParams } from "react-router-dom";

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
      <div>
        <Container>
          <div>Name: {resident.name}</div>
          <div>Height: {resident.height}</div>
          <div>Mass: {resident.mass}</div>
          <div>Hair Color: {resident.hair_color}</div>
          <div>Skin Color: {resident.skin_color}</div>
          <div>Eye Color: {resident.eye_color}</div>
          <div>Birth Year: {resident.birth_year}</div>
          <div>Gender: {resident.gender}</div>
          <div>Homeworld: {resident.homeworld}</div>
          <div>Species: {resident.species}</div>
          <div>Vehicles: {resident.vehicles}</div>
          <div>Starships: {resident.starships}</div>
        </Container>
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
        <PersonalInfo value={this.state.resident}/>
    </Paper>

    );
  }
} 
export default withRouter(ResidentProfile);