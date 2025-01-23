"use client";

import React, { Component } from "react";

import { ChildCompoment } from "../test/page";

interface State {
  count: number;
}

class Counter extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log("Component mounted");
    console.log("________Father render");
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  increment = () => {
    console.log("____before Increment", this.state.count);
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));

    console.log("____after Increment", this.state.count);
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
        <tr></tr>
        ChildCompoment: <ChildCompoment />
      </div>
    );
  }
}

export default Counter;
