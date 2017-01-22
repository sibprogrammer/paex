import React from 'react';

export default class RequestInput extends React.Component {

  static defaultProps = {
    placeholder: '',
    type: 'text'
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.id, e.target.value);
  }

  render() {
    return (
      <div className="row">
        <div className="three columns">
          <label htmlFor={this.props.id}>{this.props.title}</label>
        </div>
        <div className="nine columns">
          <input
            className="u-full-width"
            type={this.props.type}
            placeholder={this.props.placeholder}
            id={this.props.id}
            value={this.props.value}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }

}