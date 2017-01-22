import React from 'react';
import RequestInput from './components/request-input';
import './skeleton/normalize.css';
import './skeleton/skeleton.css';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiHost: localStorage.getItem('apiHost') || '',
      apiLogin: localStorage.getItem('apiLogin') || '',
      apiPassword: localStorage.getItem('apiPassword') || '',
      apiRequest: localStorage.getItem('apiRequest') || '',
      apiResponse: '...'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ apiResponse: '...' });

    fetch('/api/request', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        host: this.state.apiHost,
        login: this.state.apiLogin,
        password: this.state.apiPassword,
        request: this.state.apiRequest
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ apiResponse: response.output });
      });
  }

  handleInputChange(id, value) {
    let newState = {};
    newState[id] = value;
    this.setState(newState);
    localStorage.setItem(id, value);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Plesk API Explorer</h2>
        </div>
        <form className="App-form container" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="six columns">
              <RequestInput
                title="Host" id="apiHost" placeholder="your-plesk.com" value={this.state.apiHost}
                onChange={this.handleInputChange}
              />
              <RequestInput
                title="Login" id="apiLogin" placeholder="admin" value={this.state.apiLogin}
                onChange={this.handleInputChange}
              />
              <RequestInput
                title="Password" id="apiPassword" type="password" value={this.state.apiPassword}
                onChange={this.handleInputChange}
              />
              <label htmlFor="apiRequest">Request</label>
              <textarea
                className="u-full-width App-request"
                placeholder="<packet..."
                id="apiRequest"
                value={this.state.apiRequest}
                onChange={this.handleInputChange}
              />
              <input className="button-primary" type="submit" value="Execute"/>
            </div>
            <div className="six columns">
              <label>Response</label>
              <pre className="u-full-width App-response">{this.state.apiResponse}</pre>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
