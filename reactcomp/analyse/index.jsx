var React = require('react');
var ReactDOM = require('react-dom');
import AnalysePage from './analysepage';

const dataset_naam = document.getElementById('analysepage').getAttribute("datasetnaam");

ReactDOM.render(<AnalysePage dataset_naam={dataset_naam} />, document.getElementById('analysepage'));