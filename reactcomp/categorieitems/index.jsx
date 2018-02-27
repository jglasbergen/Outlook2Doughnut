var React = require('react');
var ReactDOM = require('react-dom');
// import 'semantic-ui-css/semantic.min.css';
import CategorieItems from './table';

// Parameter passed by chart.html
const username = document.getElementById('datatabel-2').getAttribute("username");

const TableCard = () => {
    return (
        <div>
            <CategorieItems username={username}/>
        </div>
    )
}
ReactDOM.render(
    <TableCard />,
    document.getElementById('datatabel-2')
);