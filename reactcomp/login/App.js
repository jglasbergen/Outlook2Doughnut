import React, { Component } from 'react';
import { Button, Checkbox, Form, Card, Image, Message } from 'semantic-ui-react';
import login from './assets/analytics.svg';
import DjangoCSRFToken from 'django-react-csrftoken';
import './App.css';

const Loginform = (props) => {
  return (
    <Card.Content>
      <Card.Header>
        Login
      </Card.Header>
      <Card.Description textAlign='left'>
        <Form method="POST" action="/login">
          <DjangoCSRFToken/>
          <Form.Field required>
            <label>Email</label>
            <input name='username' 
                    type='email'
                    placeholder='Voer uw email adres in' 
                    value={props.username} 
                    onChange={props.onChange}/>
          </Form.Field>
          <Form.Field required>
            <label>Wachtwoord</label>
            <input name='password' 
                    type='password' 
                    placeholder='Voer uw wachtwoord in' 
                    value={props.password}
                    onChange={props.onChange}/>
          </Form.Field>
          <Button type="submit" className='button' >Login</Button>
        </Form>
      </Card.Description>
    </Card.Content>
  )
}

const Assignform = (props) => {
  return (
    <Card.Content>
      <Card.Header>
        Registreren
      </Card.Header>
      <Card.Description textAlign='left'>
        <Form id="register-form" method="POST" action="/register">
          <DjangoCSRFToken/>
          <Form.Field required>
            <label>Email adres</label>
            <input name='username' 
                  placeholder='Voer uw email adres in' 
                  type="email"
                  onChange={props.onChange}
                  />
          </Form.Field>
          <Form.Field required>
            <label>Wachtwoord</label>
            <input name='password' 
                  placeholder='Voer uw wachtwoord in' 
                  type="password"
                  onChange={props.onChange}
                  />
          </Form.Field>
          <Form.Field required>
            <label>Bevestig wachtwoord</label>
            <input name='confirmPassword' 
                  placeholder='Bevestig uw wachtwoord' 
                  type="password"
                  onChange={props.onChange}
                  />
          </Form.Field>
          <Message 
              error
              header='Fout in formulier'
              content={props.formErrors}/>
          <Button type="submit" className='button' >Registreer</Button>
        </Form>
      </Card.Description>
    </Card.Content>
  )
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      registered:  false,
      formIsValid: true,
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      username: '',
      password: '',
      confirmPassword: '',
    }
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle(e) {
    this.setState({ registered: !this.state.registered });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
 
  render() {
    const { email, formErrors, formIsValid, password, registered } = this.state;
    return (
      <div className="App">
        <div id="container">
          <Card id="login-card">
            <Image src={login} className="Login-logo" />
            { !registered 
              ? 
                <Loginform 
                  email={email} 
                  password={password} 
                  onChange={this.handleChange} 
                  formIsvalid={formIsValid}
                  errors={formErrors}/> 
              : 
                  <Assignform 
                  onChange={this.handleChange} 
                  formIsvalid={formIsValid}
                  errors={formErrors}/> 
            }
          </Card>
          <Form.Field>
            <Checkbox label='Ik wil me registreren' onChange={this.toggle} checked={registered} />
          </Form.Field>
        </div>
      </div>
    );
  }
}

export default App;
