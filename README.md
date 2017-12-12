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
        onChange={this.handleChange.bind(this, 'select')}
        value={this.state.select} />
    );
  }
}
```