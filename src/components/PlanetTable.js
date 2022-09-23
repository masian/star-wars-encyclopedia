import React from "react";
import { ReactDOM } from "react";

const planetsUrl = 'https://swapi.dev/api/planets';

function PlanetHeader(props) {
  let counter = 0;
  const headers = Object.keys(props.value[0] ?? {}).filter(x=> (x!=='residents' && x!=='films' && x!=='url'));
  return headers.map((x) => {
    ++counter;
    return (
      <th key={counter}>
        {x.toUpperCase().replace('_', ' ')}
      </th>
    );
  });
};

function PlanetRow(props) {
  let counter = 0;
  const planets = props.value;
  return planets.map((v,k)=> {
    return (
      <tr>
          <td>{v.name}</td>
          <td>{v.rotation_period}</td>
          <td>{v.orbital_period}</td>
          <td>{v.diameter}</td>
          <td>{v.climate}</td>
          <td>{v.gravity}</td>
          <td>{v.terrain}</td>
          <td>{v.surface_water}</td>
          <td>{v.population}</td>
          <td>{v.created}</td>
          <td>{v.edited}</td>
      </tr>
    )
  })
}

class PlanetTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      planets: []
    }
  }

  async componentDidMount() {
    const response =  await fetch(planetsUrl);
    const {results} =  await response.json();
    this.setState({planets: results});
  }

  render() {
    return(
        <table id="table">
          <thead>
            <tr>
              <PlanetHeader id="header"value={this.state.planets}/>
            </tr>
          </thead>
          <tbody id="tbody">
            <PlanetRow id="row" value={this.state.planets}></PlanetRow>
          </tbody>
        </table>
    );
  }
} 

export default PlanetTable;