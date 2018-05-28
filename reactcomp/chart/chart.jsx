var React = require('react')
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { Chart } from 'react-google-charts';
import Cookies from 'js-cookie';

export default class Analyse extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: false,
            data: [],
            error: null,
            refreshing: false,
            // base_url: "/api/piechartitems/",
            dataset_naam: props.dataset_naam,
            datasetpk: props.datasetpk,
            selectedCategorie: props.selectedCategorie,
            error: null,
            isLoaded: false,
            items: [],
            dataset: 'Current Dataset',
            title: 'Analyse',
            legendPosition: { position: 'labeled'},
            options:    {title: 'Agenda Categorieën', 
                            pieHole: 0.4,
                            legend: {position: 'labeled' , textStyle: {fontSize:12}},
                            pieSliceTextStyle: { fontSize:12},
                            pieSliceText: 'value',
                        },
            chart_events: [
                {
                    eventName : 'select',
                    callback  : (Chart) => { 
                        var selectedItem = Chart.chart.getSelection()[0];
                        if (selectedItem) {
                            this.props.onChange(this.state.data[selectedItem.row + 1][0]);
                        } else {
                            // Er is geklikt, maar er is blijkbaar geen item om mee te werken!
                            console.log("Chart", Chart); 
                        }
                    }
                }
                ]
            };
        }
    
    render() {
        const { error, isLoaded, data, title, dataset_naam, datasetpk } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } 
        return (
            <MuiThemeProvider>
                <Card>
                    <CardTitle title={title} subtitle={dataset_naam}/>
                    <CardText>
                        <Chart 
                            chartType='PieChart'
                            options={this.state.options}
                            data={this.state.data}
                            width="90vw"
                            height="50vh"
                            chartEvents={this.state.chart_events}
                            />
                    </CardText>
                </Card>
            </MuiThemeProvider>
        );
    }

    // Als component geladen wordt, haal de data op uit de DRF API    
    componentDidMount() {
        this.fetchDataFromApi();
        this.fetchDataSets();
    }

    // Haal de verschillende datasets op via de API
     fetchDataSets() {
        const { filteredData } = this.state;
        const dataseturl = "/api/datasetitems/";
        const requestData = async () => {
            const response = await fetch(dataseturl);
            const json = await response.json();
            console.log(json);
            // this.setJsonToArray(json);
        }
        requestData();
    }

    // Voer de API call uit
    fetchDataFromApi() {
        const url = "/api/piechartitems/";
    
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

    // Zet piechartitems Json object om naar array van objecten 
    setJsonToArray(json_object) {
        var return_array= [];
        return_array.push( ['Categorie', 'Totaal'] );
        json_object.map(item => { 
            return_array.push([item.categorie, Number(item.sum_categorie)]);            
        })
        return return_array;
    }

    // Zet dataset Json object om naar array van objecten
    setJsonToArray(json_object) {
        var return_array= [];
        return_array.push( ['Categorie', 'Totaal'] );
        json_object.map(item => { 
            return_array.push([item.categorie, Number(item.sum_categorie)]);            
        })
        return return_array;
    }
}

