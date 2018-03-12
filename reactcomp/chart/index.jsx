var React = require('react');
var ReactDOM = require('react-dom');
import Analyse from './chart';

// Parameter passed by chart.html
const dataset_naam = document.getElementById('analyse').getAttribute("datasetnaam");

const AnalyseCard = () => {
    return (
        <div>
            <Analyse dataset_naam={dataset_naam} handleClick={this.handleClick}/>
        </div>
    )
}

ReactDOM.render(<AnalyseCard />, document.getElementById('analyse'));
