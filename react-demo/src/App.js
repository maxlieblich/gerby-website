import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  componentWillMount() {
    this.state = {content: {}};
    var that = this;
    var pathname = "/" + window.location.href.split("?")[1];
    if (pathname === "/undefined") {
      pathname = window.location.pathname;
    }
    var url = "http://127.0.0.1:5000/api" + pathname + "?callback=?";
    $.getJSON(url,
    function (result) {
      that.setState({content:result});
    });
  }
  render() {
    if (this.state.content.hasOwnProperty("type") && this.state.content.type === "tag") {
      var that = this;
      function spawnContent() {
        return {__html: that.state.content.tag.html};
      }
      // THIS IS A TOTAL KLUDGE.
      // NEVER DO THIS.
      setTimeout(function(){window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub]);}(), 1000);
      return (
        <div dangerouslySetInnerHTML={spawnContent()}>
        </div>
      );
    }
    else if (this.state.content.hasOwnProperty("type") && this.state.content.type === "chapter") {
      console.log(this.state.content.sections);
        var N = this.state.content.sections.length;
        var output = [];
        for (var i = 0; i < N; i++){
          output.push(<p>{this.state.content.sections[i].tag} points to {this.state.content.sections[i].ref}</p>)
        }
        return (
          <div>{output}</div>
        )
    }
    else {
    return (
      <div className="App">
        <p className="App-intro">
          Waiting for stuff.
        </p>
      </div>
    );
    }
  }
}

export default App;