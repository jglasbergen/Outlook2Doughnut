var React = require('react');
var ReactDOM = require('react-dom');
// import 'semantic-ui-css/semantic.min.css';
import CategorieItems from './table';

// Parameter passed by chart.html
const dataset_naam = document.getElementById('categorietabel').getAttribute("datasetnaam");

const TableCard = () => {
    return (
        <div>
            <CategorieItems dataset_naam={dataset_naam}/>
        </div>
    )
}

ReactDOM.render(
    <TableCard />,
    document.getElementById('categorietabel')
);