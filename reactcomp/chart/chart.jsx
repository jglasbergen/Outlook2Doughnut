var React = require('react')
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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
            base_url: "http://localhost:8000/api/piechartitems/",
            dataset_naam: props.dataset_naam,
            error: null,
            isLoaded: false,
            items: [],
            dataset: 'Current Dataset',
            title: 'Analyse',
            options:    {title: 'Outlook Categorieën', 
                            pieHole: 0.4,
                            // slices: {
                            //             '5': {'offset': 0.2}
                            //         }
                        },
            dataSet:[
                    ['Categorie', 'Percentage'],
                    ['Werven vrijwilligers', 9.41],
                    ['Medewerkers trainen op positieve houding', 16.47],
                    ['Pauze', 5.88],
                    ['Proces samen een probleem oplossen verbeteren', 12.94],
                    ['Uitbreiden dagbestedingsactiviteiten', 9.41],
                    ['Werkvloeren', 20],
                    ['Overig (geen doel in Hoshin)', 18.82]
                ],
            chart_events: [
                {
                    eventName : 'select',
                    callback  : (Chart) => { 
                        var selectedItem = Chart.chart.getSelection()[0];
                        if (selectedItem) {
                            console.log("Selected Item", selectedItem.row); 
                            var slice_nummer = selectedItem.row;
                            // Uitwerken hoe de slice uitgenomen kan worden op basis van de selectie!
                            Chart.chart.setSelection({options: {slices: {slice_nummer:{ 'offset': 0.2} }}});
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
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else 
            return (
                <MuiThemeProvider>
                <Card>
                    <CardTitle title={this.state.title} subtitle={this.state.dataset_naam} />
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
    
    componentDidMount() {
        this.fetchDataFromApi();
        this.state.data.forEach((element) => console.log(element[0]));
        console.log('this.state.data' + this.state.data);
    }

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

      setJsonToArray(json_object) {
        var return_array= [];
        return_array.push( ['Categorie', 'Percentage'] );
        json_object.map(item => { 
            return_array.push([item.categorie, Number(item.percentage)]);            
        })
        console.log(return_array);
        return return_array;
      }
}

