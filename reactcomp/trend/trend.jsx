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
                chartType="AreaChart"
                data={[["Dataset",
                        "Medewerkers trainen op positieve houding",
                        "Overig (geen doel in Hoshin)",
                        "Overig (geen doel in Hoshin); administratie",
                        "Pauze",
                        "Proces samen een probleem oplossen verbeteren",
                        "Uitbreiden dagbestedingsactiviteiten",
                        "Werkvloeren",
                        "Werven vrijwilligers",
                        "Extra categorie"],
                        ["november-2017",330,240,510,240,420,480,180,150,0],
                        ["december-2017",480,420,160,150,360,300,240,510,0],
                        ["januari-2018",420,480,180,150,330,240,510,240,0],
                        ["februari-2018",480,420,160,150,360,300,240,510,150]]}
                options={{title: 'Trend Analyse',
                          hAxis: {title: 'Datasets', titleTextStyle: {color: '#333'}},
                          vAxis: {minValue: 0},
                          isStacked: 'relative',
                        }}
                graph_id="AreaChart"
                width="90%"
                height="600px"
                legend_toggle
              />
              // http://react.tips/radio-buttons-in-reactjs/
              <form>
                    <div className="radio">
                        <label>
                            <input type="radio" value="percentage" checked={true} />
                                Percentage
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="relative" />
                                Relative
                        </label>
                    </div>
              </form>
            </div>
        );
    }
}

Trend.propTypes = {

};

export default Trend;