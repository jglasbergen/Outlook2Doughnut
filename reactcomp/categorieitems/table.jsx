var React = require('react');
import { Table } from 'semantic-ui-react'

export default class CategorieItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset_naam : props.dataset_naam,
      data: [],
      error: null,
      isLoaded: true,
      refreshing: false,
      totaal_aantal_minuten: null,
    }
  }

  render() {
    return (
      <Table striped size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={9}>Categorie</Table.HeaderCell>
            <Table.HeaderCell width={3} textAlign='right'>Totaal aantal minuten</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* // Iterate over de array met items en maak een tabel regel per item */}
          { this.state.data.map((item) => {  
            return (
              <Table.Row>
                <Table.Cell>{item.categorie}</Table.Cell>
                <Table.Cell textAlign='right'>{item.sum_categorie}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell textAlign='right'>Totaal</Table.HeaderCell>
            <Table.HeaderCell textAlign='right'>{this.state.totaal_aantal_minuten}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }

  // Als component geladen wordt, haal de data op uit de DRF API
  componentWillMount() {
    this.fetchDataFromApi();
  }

  // Voer de API call uit
  fetchDataFromApi() {
    const url = "http://localhost:8000/api/piechartitems/";

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
    var teller = null
    json_object.map(item => { 
        return_array.push({'categorie': item.categorie, 'sum_categorie': item.sum_categorie});  
        teller = teller + parseInt(item.sum_categorie, 10);       
    })
    // Zet de totaal teller op de state
    this.setState({totaal_aantal_minuten: teller});
    return return_array;
  }
}


