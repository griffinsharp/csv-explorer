import React, { Component } from 'react';

class Explorer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  fetchTestData() {
    fetch('/api/v1/csvs')
      .then(res => res.json())
      .then(res => console.log("res:", res))
      .catch(err => console.log("err: ", err))
  }

  render() {
    return (
      <button onClick={this.fetchTestData}>
        Fetch Test Datas
      </button>
    );
  }
}

export default Explorer;

