import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

class Select extends Component {

  constructor(props) {
    super(props);

    // Create an ID if none exists for label binding
    this.id = props.id || uuidv4();

    this.state = {
      selected: false,
      value: typeof props.value !== 'undefined' ? props.value : ''
    };

    this.handleClasses = this.handleClasses.bind(this);
  }

  // invoked before a mounted component receives new props
  componentWillReceiveProps(nextProps) {
    let firstOption = this.props.options[Object.keys(this.props.options)[0]];

    if (nextProps.value && nextProps.value !== firstOption) {
      this.setState({ selected: true });
    } else {
      this.setState({ selected: false });
    }
  }

  focus() {
    this.refs.select.focus();
  }

  handleClasses() {
    let classes = [];

    if (this.state.selected) {
      classes.push('selected');
    }

    if (this.props.value && this.props.value.length > 0 && this.props.valid) {
      classes.push('valid');
    }

    if (this.props.valid === false) {
      classes.push('invalid');
    }

    return classes.join(' ');
  }

  handleChange(e) {
    let value = e.target.value;

    this.setState((prevState, props) => {
      return {
        value
      };
    });
  }

  render() {
    return (
      <div className={`select input-field ${this.handleClasses()}`}>
        { typeof this.props.label !== 'undefined' ? <label htmlFor={this.id}>{this.props.label}</label> : '' }
        <select
          id={this.id}
          ref={el => this.select = el}
          disabled={this.props.disabled || false}
          readOnly={this.props.readonly || false}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        >
          {
            typeof this.props.options !== 'undefined' ? 
            Object.keys(this.props.options).map((key) => {
              let value = this.props.options[key]
              return <option key={`${uuidv4()}`} value={key}>{value}</option>;
            }) :
            ''
          }
        </select>
      </div>
    );
  }

}

export default Select;