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
      select: ''
      select_options: {A_key: "A-value", B_key: "B-value"}
    };
  }
  
  handleChange(field, e) {
    this.setState((prevState, props) => {
      return {
        [field]: e.target.value
      };
    });
  }
  
  render() {
    return (
      <Select
        label="Label"
        options={this.state.select_options}
        value={this.state.select} />
    );
  }
}
```