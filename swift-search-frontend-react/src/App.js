import React from "react";
import { BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import "./App.css";

import HomePage from "./HomePage";
import ArticlePage from "./ArticlePage";

function App() {
  return(
    <div>
      <Router>
         <Switch>
           <Route exact path="/" component={HomePage} />
           <Route exact path="/information/:id" component={ArticlePage} />
           {/* <Redirect to="/" /> */}
         </Switch>
       </Router>
    </div>
  )
}


export default App;


// import React from 'react'
// import ReactDOM from 'react-dom'
// import Autosuggest from 'react-autosuggest'
// import axios from 'axios'
// import { debounce } from 'throttle-debounce'

// import './App.css'

// class App extends React.Component {
//   state = {
//     value: '',
//     suggestions: []
//   }

//   componentWillMount() {
//     this.onSuggestionsFetchRequested = debounce(
//       500,
//       this.onSuggestionsFetchRequested
//     )
//   }

//   renderSuggestion = suggestion => {
//     return (
//       <div className="result">
//         <div>{suggestion.description}</div>
//       </div>
//     )
//   }

//   onChange = (event, { newValue }) => {
//     this.setState({ value: newValue })
//   }

//   onSuggestionsFetchRequested = ({ value }) => {
//     axios
//       .post('http://es.fenilkaneria.com:9200/database_9/_search', {
//         query: {
//           multi_match: {
//             query: value,
//             fields: ['description']
//           }
//         }
//       })
//       .then(res => {
//         const results = res.data.hits.hits.map(h => h._source)
//         this.setState({ suggestions: results })
//       })
//   }

//   onSuggestionsClearRequested = () => {
//     this.setState({ suggestions: [] })
//   }

//   render() {
//     const { value, suggestions } = this.state

//     const inputProps = {
//       placeholder: 'Title',
//       value,
//       onChange: this.onChange
//     }

//     return (
//       <div className="App">
//         <h1>AutoComplete Demo</h1>
//         <Autosuggest
//           suggestions={suggestions}
//           onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//           onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//           getSuggestionValue={suggestion => suggestion.description}
//           renderSuggestion={this.renderSuggestion}
//           inputProps={inputProps}
//         />
//       </div>
//     )
//   }
// }

// export default App;