import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import { Card, Radio } from 'semantic-ui-react';
import './trend.css';

class Trend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStacked: 'percentage',
            checked: false,
            data: [ 
                ["Dataset",
                "Medewerkers trainen op positieve houding",
                "Overig (geen doel in Hoshin)",
                "Overig (geen doel in Hoshin); administratie",
                "Pauze",
                "Proces samen een probleem oplossen verbeteren",
                "Uitbreiden dagbestedingsactiviteiten",
                "Werkvloeren",
                "Werven vrijwilligers",
                "Extra categorie"],
                ["november-2017",330,240,510,240,420,480,180,150,0],
                ["december-2017",480,420,160,150,360,300,240,510,0],
                ["januari-2018",420,480,180,150,330,240,510,240,0],
                ["februari-2018",480,420,160,150,360,300,240,510,150]
            ],
            filteredData: [],
            filterData: [],
            catArray: []
        }

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(event) {
        const { checked, isStacked } = this.state;
        console.log(event.target.checked);
        this.setState(
            { checked: !checked,
              isStacked: checked ? 'percentage' : 'relative' }
        );
    }

    render() {
        const { checked, data, filterData, isStacked } = this.state;
        return (
            <div className="Areachart">
              <Chart
                chartType="AreaChart"
                data={data}
                options={{title: 'Trend Analyse',
                          hAxis: {title: 'Datasets', titleTextStyle: {color: '#333'}},
                          vAxis: {minValue: 0},
                          isStacked: isStacked,
                        }}
                graph_id="AreaChart"
                width="95%"
                height="600px"
                legend_toggle
              />
              <Card centered>
                  <Card.Header>
                    <p className="Cardheader"><b>Graphic Mode</b></p>
                  </Card.Header>
                  <Card.Description>
                    <p className="Cardcontent">
                        Percentage 
                        <Radio className="Slider" 
                            slider checked={checked} 
                            onChange={this.handleToggle} />
                        Relative</p>
                  </Card.Description>
              </Card>
            </div>
        );
    }
    // Als component geladen wordt, haal de data op uit de DRF API    
    componentDidMount() {
        this.fetchDataFromApi();
    }

    // Voer de API call uit
    fetchDataFromApi() {
        const url = "http://localhost:8000/api/trendviewitems/";
        this.setState({ isLoaded: false }); 
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
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
        let return_array= [];
        let cat_array= [];
        let cur_cat = '';
        let counter = 0;
        json_object.map((item, index) => { 
            if ( cur_cat !== item.categorie ) {
                cur_cat = item.categorie;
                counter = counter + 1;
                cat_array.push([item.categorie, counter]);
            } else {
                cur_cat = '';
            }
            return_array.push([item.categorie, 
                                item.dataset__naam, 
                                Number(item.sum_categorie),
                                counter]);
            this.setState({catArray: cat_array})
        });
        console.log(this.state.catArray);
        console.log(return_array);
        this.filterDataArray();
        console.log(this.state.filterData);
        return return_array;
    }

    filterDataArray() {
        const { catArray, data, filterData} = this.state;
        let locFilterData= [];
        locFilterData.push(["Dataset"]);
        catArray.map((item) => {
            console.log(item);
            locFilterData.push([ item[0] ]);
        });
        this.setState({filterData: locFilterData});
    }
}



export default Trend;