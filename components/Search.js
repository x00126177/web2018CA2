// Import Dependencies
import React, { Component } from "react";

//
// Define SearchForm Class
//
export default class SearchForm extends Component {
  // constructor accepts props and initialises state
  constructor(props) {
    super(props);

    this.state = {};
  }

  //
  // an event handler for form submit
  //
  formSubmitted = event => {
    // Validate input value
    if (event.target.newsSource.value != "") {
      // setNewsSource is a function passed from parent (news page) via props
      // It is used as a way to pass the input value back up to the parent
      // This is called state lifting
      // see: https://reactjs.org/docs/lifting-state-up.html
      this.props.setNewsSource(event.target.newsSource.value);
    }
    // prevent page reload (prevent submit)
    event.preventDefault();
  };

  // Render the form
  render() {
    return (
      <div>
        {/* Search Input */}
        <div id="search">
          <h3>Vice News</h3>
          {/* Note event handler */}
          <form onSubmit={this.formSubmitted}>
            {/* The input field */}
            <input
              name="newsSource"
              placeholder="Type here"
              type="text"
            />
            {/* Button click will trigger submit */}
            <button>Search</button>
          </form>
        </div>
        <style jsx>{`
        #search {
          border-radius: 12px;

          margin-bottom: 2em;
          padding: 2em;
          padding-bottom: 2em;
          padding-top: 1em;
          font-family: "Arial";

          margin: auto;
          margin-bottom:em;
          width: 50%;

        }
        h3{
          color: black;
          font-size: 2em;
        }
        button{
          border-radius: 5px;
        }

      `}</style>
      </div>
    );
  }
}
