import _ from 'lodash'
var React = require('react');
import { Table } from 'semantic-ui-react'

export default class CategorieItems extends React.Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      dataset_naam : props.dataset_naam,
      data: [],
      error: null,
      isLoaded: true,
      refreshing: false,
      column: null,
      direction: null,
    }
  }

  handleSort(clickedColumn)  { 
    const { column, data, direction } = this.state
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, clickedColumn),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  handleFilter(clickedColumn)  { 
    const { column, data, direction } = this.state
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.filter(data, {'categorie': 'Werkvloeren'}),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }


  render() {
    const { column, data, direction } = this.state
    return (
      <Table striped size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3} sorted={column === 'categorie' ? direction : null} 
                          onClick={() => this.handleFilter('categorie')}>
                Categorie</Table.HeaderCell>
            <Table.HeaderCell width={6} onClick={() => this.handleFilter('categorie')}>Onderwerp</Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign='right'>Begintijd</Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign='right'>Tijdsduur</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* // Iterate over de array met items en maak een tabel regel per item */}
          { this.state.data.map((item) => {  
            return (
              <Table.Row>
                <Table.Cell>{item.categorie}</Table.Cell>
                <Table.Cell>{item.onderwerp}</Table.Cell>
                <Table.Cell textAlign='right'>{item.begintijd}</Table.Cell>
                <Table.Cell textAlign='right'>{item.tijdsduur}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    )
  }

  // Als component geladen wordt, haal de data op uit de DRF API
  componentWillMount() {
    this.fetchDataFromApi();
  }

  // Voer de API call uit
  fetchDataFromApi() {
    const url = "http://localhost:8000/api/agendaitems/";

    this.setState({ isLoaded: false });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: this.setJsonToArray(res),
          error: null,
          isLoaded: true,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, isLoaded : false });
      })
  };

  // Zet Json object om naar array van objecten
  setJsonToArray(json_object) {
    // Initialiseer de variabelen voor de array en totalen teller
    var return_array= [];
    var begintijd = null;
    var tijdsduur = null;
    var categorie = null;
    json_object.map(item => { 
      this.begintijd = item.begintijd;
      this.begintijd = this.begintijd.slice(0, this.begintijd.length - 3);
      this.categorie = item.categorie;
      this.categorie = this.categorie.slice(0, 20);
      return_array.push({'onderwerp': item.onderwerp,
                          'categorie': this.categorie,
                          'begintijd': this.begintijd, 
                          'tijdsduur': item.tijdsduur});  
    })
    return return_array;
  }
}