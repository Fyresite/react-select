import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

class Select extends Component {
  constructor(props) {
    super(props);

    // Create an ID if none exists for label binding
    this.id = props.id || uuidv4();

    this.state = {
      value: typeof props.value !== 'undefined' ? props.value : '',
      valid: ''
    };

    this.getClasses = this.getClasses.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      let state = Object.assign({}, this.state);

      state.value = this.props.value;
      state.valid = typeof this.props.validator === 'function' ? this.props.validator() : state.valid;

      this.setState((prevState, props) => {
        return state;
      });
    }
  }
  
  getClasses() {
    let classes = ['select', 'input-field'];
    
    if (this.state.selected) {
      classes.push('selected');
    }
    
    if (this.props.value && this.props.value.length > 0 && this.props.valid) {
      classes.push('valid');
    }
    
    if (this.props.valid === false) {
      classes.push('invalid');
    }

    if (typeof this.props.className !== 'undefined') {
      classes.push(this.props.className);
    }
    
    return classes.join(' ');
  }

  focus() {
    this.select.focus();
  }

  validate() {
    let valid = '';

    if (typeof this.props.validator === 'function') {
      valid = this.props.validator(this.state.value);
    }

    this.setState((state, props) => {
      return { valid };
    });

    return valid;
  }
  
  handleChange(e) {
    let value = e.target.value;

    this.setState((prevState, props) => {
      let valid = prevState.valid;

      // There is probably a missed case somewhere in here
      // Probably need to rethink the structure of this code
      // in the future.

      if (typeof this.props.validator === 'function') {
        // If the input has a validator function set, we
        // run the function and assign it's returned value
        // to valid so we can update the state.
        valid = this.props.validator(value);
      } else {
        // Since the value of the placeholder is null, e.target.value returns 
        if (typeof this.props.placeholder !== 'undefined' && value === this.props.placeholder) {
          value = '';
          valid = '';
        } else {
          valid = true;
        }
      }

      // Since the value of the placeholder is null, e.target.value returns 
      if (typeof this.props.placeholder !== 'undefined' && value === this.props.placeholder) {
        value = '';
      }

      return {
        value,
        valid
      };
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(e, this.state);
      }
    });
  }

  render() {
    let selectClasses = [];

    if (typeof this.props.selectClassName !== 'undefined') {
      selectClasses.push(this.props.selectClassName);
    }

    return (
      <div className={this.getClasses()}>
        { typeof this.props.label !== 'undefined' ? <label htmlFor={this.id}>{this.props.label}</label> : '' }
        <select
          className={selectClasses.join(' ')}
          id={this.id}
          ref={el => this.select = el}
          disabled={this.props.disabled || false}
          readOnly={this.props.readonly || false}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}>
          {
            typeof this.props.placeholder !== 'undefined' ?
              <option key={uuidv4()} value={null}>{this.props.placeholder}</option>
              : ''
          }
          {
            typeof this.props.options !== 'undefined' ? 
              Object.keys(this.props.options).map(key => {
                let value = this.props.options[key];

                return <option key={uuidv4()} value={key}>{value}</option>;
              })
              : ''
          }
        </select>
      </div>
    );
  }

}

export default Select;