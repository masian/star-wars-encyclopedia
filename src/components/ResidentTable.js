import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import './../css/PlanetTable.css';

const swapiPlanetUrl = 'https://swapi.dev/api/planets/';

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

function ResidentHeader(props) {
  let counter = 0;
  const headers = Object.keys(props.value[0] ?? {}).filter(x=> (x!=='species' && x!=='vehicles' 
  && x!=='starships' && x!== 'films' && x!== 'url' && x!=='created' && x!== 'edited'));
  return headers.map((x) => {
    ++counter;
    return (
      <TableCell key={counter} align="right">
        {x.toUpperCase().replace('_', ' ')}
      </TableCell>
    );
  });
};

function ResidentRow(props) {
  let counter = 0;
  const residents = props.value;
  const planetName = props.planetName;

    return (
      residents.map((v, k) => (
        <TableRow
          key={v.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="v" align="right" >
            <nav style={{ paddingBottom: 'solid 1px', borderBottom: '1rem' }}>
              <Link to={"/planets/"+props.planetId+"/residents/"+v.url.substring(v.url.length-2, v.url.length-1)}>{v.name}</Link>
            </nav>
          </TableCell>
          <TableCell align="right">{v.height}</TableCell>
          <TableCell align="right">{v.mass}</TableCell>
          <TableCell align="right">{v.hair_color}</TableCell>
          <TableCell align="right">{v.skin_color}</TableCell>
          <TableCell align="right">{v.eye_color}</TableCell>
          <TableCell align="right">{v.birth_year}</TableCell>
          <TableCell align="right">{v.gender}</TableCell>
          <TableCell align="right">{planetName}</TableCell>
        </TableRow>
      ))
  );
}

class ResidentTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      planetId: this.props.params.id,
      planetName: "",
      residents: []
    }
  }

  async componentDidMount() {
    const response =  await fetch(swapiPlanetUrl + this.state.planetId);
    const result =  await response.json();
    const residentUrls = result.residents;
    const residentsResponse = await Promise.all(residentUrls.map(async (x) => (
                        await (await fetch(x)).json()
                    )));
    this.setState({
        planets: result,
        planetName: result.name,
        residents: residentsResponse,
        pageCount: 0
    });
  }

  render() {
    return (
    <Paper>
       <div class="center">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" options={{search:true}}>
                <TableHead>
                <TableRow>
                    <ResidentHeader id="header" value={this.state.residents}></ResidentHeader>
                </TableRow>
                </TableHead>
                <TableBody>
                    <ResidentRow id="row" planetName={this.state.planetName} value={this.state.residents}></ResidentRow>
                </TableBody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                // onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={this.state.pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
            </TableContainer>
        </div> 
    </Paper>

    );
  }
} 
export default withRouter(ResidentTable);