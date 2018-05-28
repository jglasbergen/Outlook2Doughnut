import React, { Component } from 'react';
import { Button, Checkbox, Form, Card, Image, Message } from 'semantic-ui-react';
import DjangoCSRFToken from 'django-react-csrftoken';
import '../login/App.css';
import './beheer.css';
import '../../backend/static/styles/analyse.css';

class BeheerPage extends Component {
    constructor(props) {
        super(props);
        this.state = { htmlcontent: '' }
    }
    
    /* 
        ASYNC / AWAIT gebruiken om de onderstaande fetch beter af te vangen.
        Nu wordt het eerste varretje gevuld met een promise object ipv de inhoud!!!!!!
    */
    componentDidMount() {
        this.fetchDataFromApiAsync();
    }

    fetchDataFromApiAsync() {
        const { htmlcontent } = this.state;
        const url = '/datasetform'
        const requestData = async () => {
            const response = await fetch(url, {method: 'GET', credentials: 'same-origin'});
            const htmlText = await response.text();
            this.setState({htmlcontent: htmlText})
        }
        requestData();
    }

    createMarkup() {
        return {__html: this.state.htmlcontent};
    }

    render() {
        return (
            <div className="page">
                <div className="page-row">
                    <h3>Importeer & Beheer Datasets</h3>
                    <div className="page-col">
                        <div className="table-card">
                            <Card fluid raised>
                                <Card.Content>
                                    <Card.Header>
                                    Importeer Dataset
                                    </Card.Header>
                                    <Card.Description textAlign='left'>
                                        <Form method="POST" action="/datasetform" encType="multipart/form-data">
                                            <DjangoCSRFToken/>
                                            <div dangerouslySetInnerHTML={this.createMarkup()} />
                                            <Button type="submit" className='button' >Importeer</Button>
                                        </Form>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </div>
                        <div className="table-card">
                            <Card fluid raised>
                                <Card.Content>
                                    <Card.Header>
                                    Beheer Dataset
                                    </Card.Header>
                                    <Card.Description textAlign='left'>
                                        <Form >
                                            <Form.Field>
                                                <label>First Name</label>
                                                <input placeholder='First Name' />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Last Name</label>
                                                <input placeholder='Last Name' />
                                            </Form.Field>
                                            <Form.Field>
                                                <Checkbox label='I agree to the Terms and Conditions' />
                                            </Form.Field>
                                            <Button type='submit'>Submit</Button>
                                        </Form>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BeheerPage;



