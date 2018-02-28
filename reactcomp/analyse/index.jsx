var React = require('react');
var ReactDOM = require('react-dom');
import Analyse from '../chart/chart';
import CategorieItems from '../categorieitems/table';
import AgendaItems from '../agendaitems/table';
import '../../backend/static/styles/analyse.css';

// Parameter passed by chart.html
const dataset_naam = document.getElementById('analysepage').getAttribute("datasetnaam");

const AnalysePage = () => {
    return (
        <div className="page">
            <div className="page-row">
                <Analyse className="analyse-card" id="analyse"  dataset_naam={dataset_naam}/>
                <div className="page-col">
                    <div className="table-card"><CategorieItems id="categorietabel" dataset_naam={dataset_naam}/></div>
                    <div className="table-card"><AgendaItems id="agendatabel" dataset_naam={dataset_naam}/></div>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(
    <AnalysePage />,
    document.getElementById('analysepage')
);