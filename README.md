# react-select

Base Select React Component built for internal Fyresite use. 

## Installation

```
npm install --save-dev @fyresite/react-select
```

## Usage

```javascript
import React, { Component } from 'react';
import Select from '@fyresite/react-select';

class Example extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      select: {
        value: '',
        valid: ''
      },
      options: {
        key1: "Option 1",
        key2: "Option 2"
      }
    };
  }
  
  handleChange(field, e, selectState) {
    this.setState((prevState, props) => {
      return {
        [field]: selectState
      };
    });
  }
  
  render() {
    return (
      <Select
        label="Label"
        onChange={this.handleChange.bind(this, 'select')}
        options={this.state.options}
        placeholder="Placeholder"
        ref={el => { this.select = el; }}
        validator={val => { return val === 'key2'; }}
        value={this.state.value} />
    );
  }
}
```