import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import { Card, Checkbox, Radio, Table } from 'semantic-ui-react';
import './trend.css';

class Trend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStacked: 'percentage',
            checked: false,
            apiData: [],
            dataSetArray: [],
            filteredData: [],
            filterData: [],
            catArray: [],
            filterArray: []
        }

        this.handleToggle = this.handleToggle.bind(this);
        this.handleCatToggle = this.handleCatToggle.bind(this);
        this.dataSetToggle = this.dataSetToggle.bind(this);
    }


    handleToggle(event) {
        const { checked, isStacked } = this.state;
        this.setState(
            { checked: !checked,
              isStacked: checked ? 'percentage' : 'relative' }
        );
    }
    
    handleCatToggle(event, data) {
        const { catArray } = this.state;
        let counter = 0;
        catArray.map((item) => { (item[2]) ? counter++ : ''});
        if ( counter > 1 || data.checked) {
            let loccatArray = catArray;
            loccatArray[data.id-1][2] = ( !loccatArray[data.id-1][2] );
            this.setState(
                { catArray: loccatArray }
            );
            this.filterDataArray();
        }
    }
    
    dataSetToggle(event, data) {
        const { dataSetArray } = this.state;
        let counter = 0;
        dataSetArray.map((item) => { (item[2]) ? counter++ : ''});
        if ( counter > 1 || data.checked) {
            let locdataSetArray = dataSetArray;
            locdataSetArray[locdataSetArray.length-1-data.arrayid][2] = ( !locdataSetArray[locdataSetArray.length-1-data.arrayid][2] );
            this.setState(
                { dataSetArray: locdataSetArray }
            );
            this.filterDataArray();
        }
    }

    render() {
        const { catArray, checked, data, dataSetArray, filteredData, isStacked } = this.state;
        return (
            <div className="Areachart">
              <Chart
                chartType="AreaChart"
                data={filteredData}
                options={
                            {title: 'Trend Analyse',
                                hAxis: {title: 'Datasets', titleTextStyle: {color: '#333'}},
                                vAxis: {minValue: 0},
                                isStacked: isStacked,
                                legend: {textStyle: {fontSize:12}},
                            }
                        }
                graph_id="AreaChart"
                width="95%"
                height="600px"
                legend_toggle
              />
              <Card.Group>
                <Card centered className="Tablecard">
                    <Card.Header>
                        <p className="Cardheader"><b>Categorie Keuze</b></p>
                    </Card.Header>
                    <Card.Description>
                        <Table striped size='small'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={6}>Categorie</Table.HeaderCell>
                                    <Table.HeaderCell width={2} textAlign='center'>Uit / Aan</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                { catArray.map((item, index) => {   
                                    return (
                                    <Table.Row key={item[0]}>
                                        <Table.Cell>{item[0]}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Checkbox slider 
                                                        id={item[1]}
                                                        checked={item[2]}
                                                        onChange={this.handleCatToggle}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                    );
                                })}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>  
                    </Card.Description>
                </Card>                  
                <Card centered className="Tablecard">
                    <Card.Header>
                        <p className="Cardheader"><b>Dataset Keuze</b></p>
                    </Card.Header>
                    <Card.Description>
                        <Table striped size='small'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={6}>Dataset</Table.HeaderCell>
                                    <Table.HeaderCell width={2} textAlign='center'>Uit / Aan</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                { dataSetArray.map((item, index) => {   
                                    return (
                                    <Table.Row key={item[0]}>
                                        <Table.Cell>{item[0]}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Checkbox slider 
                                                        id={item[0]}
                                                        arrayid={item[1]}
                                                        checked={item[2]}
                                                        onChange={this.dataSetToggle}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                    );
                                })}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>  
                    </Card.Description>
                </Card>
                <Card centered className="Tablecard">
                    <Card.Header>
                        <p className="Cardheader"><b>Graphic Mode</b></p>
                    </Card.Header>
                    <Card.Description>
                        <Table striped size='small'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={1}></Table.HeaderCell>
                                    <Table.HeaderCell width={2}></Table.HeaderCell>
                                    <Table.HeaderCell width={1}></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            Percentage 
                                        </Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Radio className="Slider" 
                                                    slider checked={checked} 
                                                    onChange={this.handleToggle} />
                                        </Table.Cell>
                                        <Table.Cell>
                                            Relative
                                        </Table.Cell>
                                    </Table.Row>
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>  
                    </Card.Description>
                </Card>
              </Card.Group>
            </div>
        );
    }
    // Als component geladen wordt, haal de data op uit de DRF API    
    componentDidMount() {
        this.fetchDataFromApiAsync();
    }
    
    fetchDataFromApiAsync() {
        const { filteredData } = this.state;
        const url = "/api/trendviewitems/";
        const requestData = async () => {
            const response = await fetch(url);
            const json = await response.json();
            this.setJsonToArray(json);
            this.filterDataArray();
        }
        requestData();
    }

    // Zet Json object om naar array van objecten 
    setJsonToArray(dataFromApi) {
        const { apiData, catArray, dataSetArray, filterArray, filteredData } = this.state;
        let return_array= [];
        let cat_array= [];
        let dataset_array = [];
        let datasetarray = [];
        let filter_array= [];
        let cur_cat = '';
        let counter = 0;
        let dscounter = 0;
        let already_exist = false;
        dataFromApi.map((item, index) => { 
            // Verzamel de unieke datasets
            let ds_naam = item.dataset__naam;
            if ( dataset_array.length === 0 ) {
                already_exist = false;
            } else {
                dataset_array.map((item) => {
                    if ( item[0] ===  ds_naam ) {
                        already_exist = true;
                    }
                })
            }
            if ( !already_exist ) {
                dataset_array.push([item.dataset__naam, dscounter, true, item.dataset__inleesdatum]);
                already_exist = false;
                dscounter++;
            }
            if ( cur_cat !== item.categorie ) {
                cur_cat = item.categorie;
                counter = counter + 1;
                cat_array.push([item.categorie, counter, true]);
                filter_array.push([item.categorie, counter, true]);
            } else {
                cur_cat = '';
            }
            return_array.push([ item.categorie, 
                                item.dataset__naam, 
                                Number(item.sum_categorie),
                                counter,
                                item.dataset__inleesdatum 
                            ]);
        });
        datasetarray = dataset_array.reverse();
        this.setState(
            {   catArray: cat_array, 
                dataSetArray: datasetarray, 
                filterArray: filter_array, 
                apiData: return_array
            }
        );
        return return_array;
    }

    filterDataArray() {
        const { apiData, catArray, dataSetArray, filterArray, filterData, filteredData } = this.state;
        let labelData= [];
        labelData[0]= "Dataset";
        let locFilterData= [];
        let counter =  1;
        // Vul de eerste array regel met categorieen
        catArray.map((item, index) => {
            if ( item[2] ) {
                labelData[counter]= item[0];
                counter = counter + 1;
            }
        });
        locFilterData.push(labelData);
        // Check of dataset moet worden getoond
        dataSetArray.map((item) => {
            if ( item[2] ) {
                let dataset = item[0];
                // Check of de categorieen moeten worden getoond
                let pushData = [];
                let counter = 0;
                pushData[counter] = dataset;
                catArray.map((item) => {
                    if ( item[2]) { 
                        let categorie = item[0];
                        apiData.map((item) => {
                            if ( item[0] === categorie && item[1] === dataset ) {
                                counter = counter + 1;
                                pushData[counter] = item[2];
                            }
                        });
                    }
                })
                locFilterData.push(pushData);
            }
        });
        // Zet de verzamelde data in filteredData array
        this.setState({filteredData: locFilterData});       
    }
}

export default Trend;