import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from "material-ui-search-bar";
import { Link } from "react-router-dom";

const planetsUrl = 'https://swapi.dev/api/planets/';

function PlanetHeader(props) {
  let counter = 0;
  const headers = Object.keys(props.value[0] ?? {}).filter(x=> (x!=='residents' && x!=='films' && x!=='url' 
  && x!== 'created' && x!=='edited'));
  return headers.map((x) => {
    ++counter;
    return (
      <TableCell key={counter} align="right">
        {x.toUpperCase().replace('_', ' ')}
      </TableCell>
    );
  });
};

function PlanetRow(props) {
  let counter = 0;
  const planets = props.value;
    return (
      planets.map((v, k) => (
        <TableRow
          key={v.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="v" >
            <nav style={{ paddingBottom: 'solid 1px', borderBottom: '1rem' }}>
              <Link to={"/planets/"+v.url.substring(v.url.length - 2, v.url.length-1)+ "/residents"}>{v.name}</Link>
            </nav>
          </TableCell>
          <TableCell align="right">{v.rotation_period}</TableCell>
          <TableCell align="right">{v.orbital_period}</TableCell>
          <TableCell align="right">{v.diameter}</TableCell>
          <TableCell align="right">{v.climate}</TableCell>
          <TableCell align="right">{v.gravity}</TableCell>
          <TableCell align="right">{v.terrain}</TableCell>
          <TableCell align="right">{v.surface_water}</TableCell>
          <TableCell align="right">{v.population}</TableCell>
        </TableRow>
      ))
  );
}

class PlanetTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      currentTableData: [],
      search: ""
    }
  }

  async componentDidMount() {
    const response =  await fetch(planetsUrl);
    const {results} =  await response.json();
    this.setState({
      planets: results,
      search: "",
      currentTableData: results
    });
  }

  render() {

    return (
    <Paper>
      <SearchBar
        value={this.state.value}
        onChange={(newValue) => this.setState({ search: newValue.toLowerCase() })}
        onRequestSearch={() => {          
          this.setState({currentTableData: updatePlanets(this.state.search, this.state.planets)})
        }}
      />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" options={{search:true}}>
        <TableHead>
          <TableRow>
            <PlanetHeader id="header" value={this.state.currentTableData}></PlanetHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <PlanetRow id="row" value={this.state.currentTableData}></PlanetRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>

    );
  }
} 

function updatePlanets(search, planets) {
  return search ? planets.filter(x=>x.name === search) : planets;
}
export default PlanetTable;