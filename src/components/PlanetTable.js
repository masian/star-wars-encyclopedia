import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import SearchBar from "material-ui-search-bar";
import { Link } from "react-router-dom";
import { maxWidth } from '@mui/system';
import './../css/PlanetTable.css';

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
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      planets: [],
      currentTableData: [],
      search: "",
      page: 1,
      next: "",
      previous: "",
      isLoading: true
    }
  }

  async componentDidMount() {
    const response =  await fetch(planetsUrl);
    const {results, count, next, previous} =  await response.json();
    let pages;
    
    if(count > 0 && count <= 10) {
      pages = count;
    }
    else if(count >= 10) {
      pages = count/10;
    }

    this.setState({
      planets: results,
      search: "",
      currentTableData: results,
      page: 1,
      total: pages,
      next: next,
      previous: previous,
      isLoading: false
    });
  }

  async handleChange(event, value) {
    let response;
    const url = this.state.next.substring(0, this.state.next.length -1) + value;  
    response =  await fetch(url);

    const {results, previous, next} =  await response.json();
  
    this.setState({
      planets: results,
      currentTableData: results,
      page: value,
      next: next,
      previous: previous,
      isLoading: false
    });
  }
  

  render() {

    return (
      <div className="center">
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {this.state.isLoading && <CircularProgress/>}
        </div>
      {!this.state.isLoading &&
      <Paper>
        <div>
          <SearchBar className="search"
            value={this.state.value}
            onChange={(newValue) => this.setState({ search: newValue.toLowerCase() })}
            onRequestSearch={() => {          
              this.setState({currentTableData: updatePlanets(this.state.search, this.state.planets)})
            }}
          />
          <div className="table">
            <TableContainer component={Paper} sx={{ minWidth: 650, maxWidth: 1500}}>
              <Table aria-label="simple table" options={{search:true}}>
                <TableHead>
                  <TableRow>
                    <PlanetHeader className="header" value={this.state.currentTableData}></PlanetHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <PlanetRow className="row" value={this.state.currentTableData}></PlanetRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination class="center" page={this.page} count={this.state.total !== 0 ? this.state.total : 1} shape="rounded" onChange={this.handleChange}/>}
        </div>
      </div>       
      </Paper>}
    </div>
    );
  }
} 

function updatePlanets(search, planets) {
  return search ? planets.filter(x=>x.name.toLowerCase().includes(search.toLowerCase())) : planets;
}
export default PlanetTable;