var React = require('react');
var ReactDOM = require('react-dom');
import AnalysePage from './analysepage';

const dataset_naam = document.getElementById('analysepage').getAttribute("datasetnaam");
const datasetpk = document.getElementById('analysepage').getAttribute("datasetpk");
console.log("datasetpk", datasetpk);

ReactDOM.render(<AnalysePage dataset_naam={dataset_naam} datasetpk={datasetpk} />, document.getElementById('analysepage'));