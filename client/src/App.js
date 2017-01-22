import React from 'react';
import './skeleton/normalize.css';
import './skeleton/skeleton.css';
import './App.css';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

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

  handleInputChange(e) {
    let newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
    localStorage.setItem(e.target.id, e.target.value);
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
              <div className="row">
                <div className="three columns">
                  <label htmlFor="apiHost">Host</label>
                </div>
                <div className="nine columns">
                  <input
                    className="u-full-width"
                    type="text"
                    placeholder="your-plesk.com"
                    id="apiHost"
                    value={this.state.apiHost}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="three columns">
                  <label htmlFor="apiLogin">Login</label>
                </div>
                <div className="nine columns">
                  <input
                    className="u-full-width"
                    type="text"
                    placeholder="admin"
                    id="apiLogin"
                    value={this.state.apiLogin}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="three columns">
                  <label htmlFor="apiPassword">Password</label>
                </div>
                <div className="nine columns">
                  <input
                    className="u-full-width"
                    type="password"
                    id="apiPassword"
                    value={this.state.apiPassword}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
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
