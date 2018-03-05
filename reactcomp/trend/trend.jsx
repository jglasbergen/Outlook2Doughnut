import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';

class Trend extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={'my-pretty-chart-container'}>
              <Chart
                chartType="Line"
                data={[['Age', 'Weight'], [8, 12], [4, 5.5]]}
                options={{}}
                graph_id="ScatterChart"
                width="100%"
                height="400px"
                legend_toggle
              />
            </div>
        );
    }
}

Trend.propTypes = {

};

export default Trend;