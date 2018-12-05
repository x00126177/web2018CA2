// This is the Link API
import Link from 'next/link';
// Import fetch library
import fetch from 'isomorphic-unfetch';
// import SearchForm Component
//import SearchForm from '../components/SearchForm';


const source = '';

// My API Key
const apiKey = '425415ed892a4afdabc0c8ecd315afe2';

// building the URL which will be used to get the data
const url = `https://newsapi.org/v2/top-headlines?country=ie&category=science&apiKey=425415ed892a4afdabc0c8ecd315afe2`

// Initial News source
const defaultScienceSource = '';

// DATE TIME FORMAT
function dTime(dateString){
  var d = new Date(dateString);
  return `${d.toDateString()} at ${d.toLocaleTimeString()}`;
}

// Pass this content as 'props' to child components
const Science = props => (
    <div>
        <h2 className="title1">Science {source.split("-").join(" ")}</h2>
      <div>

      {props.articles.map(article => (
        <section>
          <h3 className="title2">{article.title}</h3>
          <p className="author">{article.author} {dTime(article.publishedAt)}</p>
          <img src={article.urlToImage} alt="article image" className="img-article"></img>
          <p>{article.description}</p>
          <p>{article.content}</p>
        </section>
    ))}     
    </div>


<style jsx>{`
  	section {
      border: 0.3px solid black;
      border-radius: 8px;

      background-color: #e6e6ff;
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
      padding: em;
      padding-top: 0em;
      font-family: "Arial";

      margin: auto;
      width: 50%;
      padding: 10px;
    }
    .img-article {
      max-width: 45%;
    }
    .author {
      font-style: italic;
      font-size: 0.8em;
    }
  `}</style>
</div>
);

Science.getInitialProps = async function() {

  const res = await fetch(url);

  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.articles.length}`);

  return {
    articles: data.articles
  }
}
  
export default Science;
