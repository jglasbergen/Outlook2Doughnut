var React = require('react');
var ReactDOM = require('react-dom');
// import 'semantic-ui-css/semantic.min.css';
import AgendaItems from './table';

// Parameter passed by chart.html
const username = document.getElementById('datatabel-1').getAttribute("username");

const TableCard = () => {
    return (
        <div>
            <AgendaItems username={username}/>
        </div>
    )
}

ReactDOM.render(
    <TableCard />,
    document.getElementById('datatabel-1')
);
ReactDOM.render(
    <TableCard />,
    document.getElementById('datatabel-2')
);