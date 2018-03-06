import React, { Component } from 'react';
import Analyse from '../chart/chart';
import CategorieItems from '../categorieitems/table';
import AgendaItems from '../agendaitems/table';
import '../../backend/static/styles/analyse.css';

class AnalysePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategorie: 'Geen categorie gekozen',
            dataset_naam: this.props.dataset_naam
        }
    };

    // Vang de wijzingen in geselecteerde categorie af vanuit de piechart
    // En stel de propertie hier op in
    handleCategorieChange(selid) {
        this.setState({selectedCategorie: selid});
    }

    render() {
            return (
                <div className="page">
                <div className="page-row">
                    <Analyse  onChange={(selid) => this.handleCategorieChange(selid)}
                            className="analyse-card" id="analyse" dataset_naam={this.state.dataset_naam} selectedCategorie={this.state.selectedCategorie}/>
                    <div className="page-col">
                        <div className="table-card">
                            <CategorieItems id="categorietabel" dataset_naam={this.state.dataset_naam}/>
                        </div>
                        <div className="table-card">
                            <AgendaItems id="agendatabel" dataset_naam={this.state.dataset_naam} selectedCategorie={this.state.selectedCategorie}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AnalysePage;
