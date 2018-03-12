import _ from 'lodash'
var React = require('react');
import { Table } from 'semantic-ui-react'

export default class AgendaItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset_naam: props.dataset_naam,
      selectedCategorie: props.selectedCategorie,
      data: [],
      filteredData: [],
      error: null,
      isLoaded: true,
      refreshing: false,
      column: null,
      direction: null,
    }
  }

  render() {
    const { column, filteredData, direction, selectedCategorie } = this.state
    return (
      <Table striped size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={6}>Onderwerp</Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign='right'>Begintijd</Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign='right'>Tijdsduur</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* // Iterate over de array met items en maak een tabel regel per item */}
          { this.state.filteredData.map((item) => {  
            return (
              <Table.Row key={item.index}>
                <Table.Cell>{item.onderwerp}</Table.Cell>
                <Table.Cell textAlign='right'>{item.begintijd}</Table.Cell>
                <Table.Cell textAlign='right'>{item.tijdsduur}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell><b>{this.state.selectedCategorie}</b></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }

  // Filter de dataset op basis van de nieuwe categorie
  handleFilter(selectedCategorie)  { 
    const { data, filteredData } = this.state
    this.setState({
      filteredData: _.filter(data, {'categorie': selectedCategorie}),
    })
  }

  // We krijgen een props wijziging binnen
  componentWillReceiveProps(nextprops) {
    const { selectedCategorie } = this.state
    // Check of er een nieuwe categorie geselecteerd is
    // Onderneem dan de juiste stappen
    if(selectedCategorie !== nextprops.selectedCategorie) {
      this.setState({selectedCategorie: nextprops.selectedCategorie})
      this.handleFilter(nextprops.selectedCategorie)
    }
  }
  
  // Als component geladen wordt, haal de data op uit de DRF API
  componentDidMount() {
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
          filteredData: this.setJsonToArray(res),
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
    json_object.map((item, index) => { 
      this.begintijd = item.begintijd;
      this.begintijd = this.begintijd.slice(0, this.begintijd.length - 3);
      this.categorie = item.categorie;
      // this.categorie = this.categorie.slice(0, 20);
      return_array.push({ 'index': index,
                          'onderwerp': item.onderwerp,
                          'categorie': this.categorie,
                          'begintijd': this.begintijd, 
                          'tijdsduur': item.tijdsduur});  
    })
    return return_array;
  }
}