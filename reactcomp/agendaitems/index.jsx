var React = require('react');
var ReactDOM = require('react-dom');
// import 'semantic-ui-css/semantic.min.css';
import AgendaItems from './table';

// Parameter passed by chart.html
const dataset_naam = document.getElementById('agendatabel').getAttribute("datasetnaam");

const TableCard = () => {
    return (
        <div>
            <AgendaItems dataset_naam={dataset_naam}/>
        </div>
    )
}

ReactDOM.render(
    <TableCard />,
    document.getElementById('agendatabel')
);
