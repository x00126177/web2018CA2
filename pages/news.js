// IMPORTS
import Link from 'next/link';

import fetch from 'isomorphic-unfetch';

// search form
import SearchForm from "../components/Search";

const source = 'Vice-news';

// My API Key
const apiKey = '425415ed892a4afdabc0c8ecd315afe2';

// building the URL which will be used to get the data

// Initial News source
const defaultNewsSource = 'vice-news';

//

// getNews(url) is an async method which fetches and returns data (or an error) from a WWW API

//

async function getNews(url) {
 // try fetch and catch any errors
      try {
      // Make async call
      const res = await fetch(url);
      // get json data when it arrives
      const data = await res.json();
      // return json data
      return (data);
      } catch (error) {
    // return error if it occurs
  return (error); 
      }
}


// DATE TIME FORMAT
function dTime(dateString){
  var d = new Date(dateString);
  return `${d.toDateString()} at ${d.toLocaleTimeString()}`;
}


// The News page defined as an ES6 Class
//
export default class news extends React.Component {
  // Constructor
  // Recieve props and initialise state properties
  //
  constructor(props) {
      super(props)
      this.state = {
      newsSource: "",
      url: "",
      articles: []
    }
  } //end Constructor

  
  // SEARCH FORMAT
  setNews = (input) => {
    this.setState({
      newsSource: input,
      url: `https://newsapi.org/v2/top-headlines?sources=vice-news&apiKey=425415ed892a4afdabc0c8ecd315afe2`
    })
  }
  searchNews = (event) => {
    // set state values - this will trigger an update and componentDidUpdate
    this.setState({
      // Get the link text
      newsSource: `${event.target.innerText}`,
      // Build the search URL using the link name
      url: `https://newsapi.org`
    })
    console.log(this.state.url);
  }
  //
  // render() method generates the page
  //
  render() {
    
  if (this.state.articles.length == 0) {
  this.state.articles = this.props.articles;
  }
  
  return (
<div>
<SearchForm setNews={this.setNews}/>                              {/* SEARCH FORM */}
<ul className="newsMenu">
          <li><a href="#" onClick={this.searchNews} name="https://newsapi.org/v2/top-headlines?country=us&apiKey=425415ed892a4afdabc0c8ecd315afe2">All about Donald Trump</a></li>
          <li><a href="#" onClick={this.searchNews} name="https://newsapi.org/v2/everything?q=business&apiKey=425415ed892a4afdabc0c8ecd315afe2">Business News </a></li>
          <li><a href="#" onClick={this.searchNews} name="https://newsapi.org/v2/top-headlines?sources=vice-news&apiKey=425415ed892a4afdabc0c8ecd315afe2">Technology News</a></li>
        </ul>
      
      <h3 className="title1">{this.state.newsSource.split("-").join(" ")}</h3>
      

          <div>
            {this.state.articles.map((article, index) => (
              <section key ={index}>
                <h3 className="title2">{article.title}</h3>
                <p className="author">{article.author} {dTime(article.publishedAt)}</p>
                <img src={article.urlToImage} alt="article image" className="img-article"></img>
                <p>{article.description}</p>
                <p>{article.content}</p>
                <p><Link as={`/article/${index}`} href={`/article?id=${index}`}><a>Read More</a></Link></p>
              </section>
          ))} 
      </div>  
<style jsx>{`
        section {
          border-radius: 12px;

          background-color: #cceeff;
          margin-bottom: 2em;
          padding: 2em;
          padding-bottom: 2em;
          padding-top: 1em;
          font-family: "Arial";

          margin: auto;
          margin-bottom:2em;
          width: 50%;
        
          
        }
        .title1 {
          margin: 2em;
          
          padding-bottom: 1em;
          font-family: "Arial";

          margin: auto;
          width: 50%;
          
        }
        .img-article {
          max-width: 45%;
        }
        .author {
          font-style: italic;
          font-size: 0.8em;
        }
        .newsMenu{
          border-radius: 12px;

          margin-bottom: em;
          padding: 2em;
          padding-bottom: 2em;
          padding-top: 1em;
          font-family: "Arial";

          margin: auto;
          margin-bottom:2em;
          width: 50%;
        }
        .newsMenu li {
        
        }
        .newsMenu li a{
          font-size: 1.5em;
          color: black;
          display: block;
          test-decoration: none;
        }
        .newsMenu li a:hover {
          color: #cceeff;
        }
      `}</style>
    </div>
  );
}

static async getInitialProps(response) {
  
  // Build the url which will be used to get the data
  // See https://newsapi.org/s/the-irish-times-api
  const defUrl = `https://newsapi.org/v2/top-headlines?sources=vice-news&apiKey=425415ed892a4afdabc0c8ecd315afe2`;
  
  // Get news data from the api url
  const data = await getNews(defUrl);

  // If the result contains and articles array then it is good so return articles
  if (Array.isArray(data.articles)) {
    return {
      articles: data.articles
    }
  }
  // Otherwise it contains an error, log and redirect to error page (status code 400)
  else {
    console.error(data)
    if (response) {
      response.statusCode = 400
      response.end(data.message);
    }
  }
}


async componentDidUpdate(prevProps, prevState) {

  // Check if newsSource url has changed to avoid unecessary updates 
  if (this.state.url !== prevState.url) {

    // Use api url (from state) to fetch data and call getNews()
    const data = await getNews(this.state.url);

    // If the result contains and articles array then it is good so update articles
    if (Array.isArray(data.articles)) {
      // Store articles in state
      this.state.articles = data.articles;
      // Force page update by changing state (make sure it happens!)
      this.setState(this.state);
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
      console.error(data)
      if (response) {
        response.statusCode = 400
        response.end(data.message);
      }
    }
  }
} // End componentDidUpdate



} // End class
