import React, { Component } from "react";
import Constants from "./Constants";
import "./Article.css"

export class ArticlePage extends Component {
  state = {
    data: {}
  };
  componentDidMount() {
    //console.log(Constants.elasticSearchUrl+"/"+ Constants.elasticSearchAppName);
    fetch(
      Constants.elasticSearchUrl+"/"+ Constants.elasticSearchAppName +"/_search?q=_uuid:" + this.props.match.params.id
    )
      .then(response => {
        // console.log(Constants.elasticSearchUrl+"/"+ Constants.elasticSearchAppName +"/_search?q=_id:E5nx8H8B7X1CA3BjawZK");
        // console.log(response.json())
        return response.json();
      })
      .then(myJson => {
        console.log(myJson.hits.hits[0]._source);
        this.setState({ data: myJson.hits.hits[0]._source });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }
  render() {
    return (
      <div>
          <article className="article">
            <div className="article-details">              
              <img className="cardImage2" src={this.state.data.image_url} />
              <div className="article-more-details">
              <p className="details">Details</p>
              <div className="labels">
                <p className="label">Author :</p>
                <p className="label-data">{this.state.data.author_name}</p>
              </div> 
              <div className="labels">
                <p className="label">Publisher :</p>
                <p className="label-data">{this.state.data.publisher}</p>
              </div>
              <div className="labels">
                <p className="label">Publication Date :</p> 
                <p className="label-data">{this.state.data.publication_date}</p>
               
              </div>
              <div className="labels">
                <p className="label">Pages :</p>
                <p className="label-data">{this.state.data.num_pages}</p>
              </div> 
              <div className="labels">
                <p className="label">Language :</p>
                <p className="label-data">{this.state.data.language}</p>
              </div> 
              <div className="labels">
                <p className="label">Ratings :</p>
                <p className="label-data">{this.state.data.ratings_count}</p>
              </div>  
              </div>                         
            </div>
            {/* <hr className="divider"/> */}
            <div className="article-content">
              <h2 className="article-title">{this.state.data.title}</h2> 
              <p className="article-description">{this.state.data.description}</p>           
            </div>            
        </article>
      </div>
    );
  }
}
export default ArticlePage