import {withRouter} from 'next/router'

// Import fetch library
import fetch from "isomorphic-unfetch";

//(free version) API key from  https://newsapi.org/
// Get your own key!
const apiKey = "425415ed892a4afdabc0c8ecd315afe2";

// Initial News source
const defaultNewsSource = "Vice-news";

//
// async method fetches and returns data from a url
//
async function getNews(url) {
  // try fetch and catch any errors
  try {
    // Make async call
    const res = await fetch(url);
    // get json data when it arrives
    const data = await res.json();
    // return json data
    return data;
  } catch (error) {
    // return error if it occurs
    return error;
  }
}

//
//  The News page defined as an ES6 Class
//
class Article extends React.Component {
  // Constructor
  // Recieve props and initialise state properties
  constructor(props) {
    super(props);
    this.state = {};
  }

  //
  // render() method generates the page
  //
  render() {
    // Position in articles array to use 
    let id = 0;

    // Get single article
    let article = this.props.articles[id];

    return (
      <div>
        {/* Display a title based on source */}
        <h3 className="title1">{defaultNewsSource.split("-").join(" ")}</h3>
        <div>
          {/* Show the article) */}
          <section>
          <h3>{article.title}</h3>

          </section>
          
        </div>

        <style jsx>{`
        section {
         border: 0.3px solid black;
         border-radius: 8px;
   
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
        padding-top: 1em;
        padding-bottom: 1em;
        font-family: "Arial";
  
        margin: auto;
        width: 50%;
        
      }
        `}</style>
      </div>
    );
  }

  //
  // Get initial data on server side using an AJAX call
  // This will initialise the 'props' for the News page
  //
  static async getInitialProps(res) {
    // Build the url which will be used to get the data
    // See https://newsapi.org/s/the-irish-times-api
    
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;

    // Get news data from the api url
    const data = await getNews(defaultUrl);

    // If the result contains and articles array then it is good so return articles
    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      };
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
      console.error(data);
      if (res) {
        res.statusCode = 400;
        res.end(data.message);
      }
    }
  }
} // End class

// export withRouter - enables this class to access React Router properties, e.g. to get the URl parameters
export default withRouter(Article)