import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner, { loading } from './loading'
import PropTypes from 'prop-types';

export class News extends Component {


    articles = [
        {
            "source": {
                "id": "bbc-sport",
                "name": "BBC Sport"
            },
            "author": "BBC Sport",
            "title": "Shane Warne memorial - watch & follow updates",
            "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
            "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
            "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
            "publishedAt": "2022-03-30T08:22:26.498888Z",
            "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]

    static defaultProps = {
        country: 'us',
        pageSize: 10,
        country: 'general',

      }

      static pnropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

      }

    constructor(){
        super();
        // console.log("Cons From News Component");
        this.state = {
            articles: this.articles,
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03576bafb64e486f9b384d81315f196d&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        } )
    }

    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03576bafb64e486f9b384d81315f196d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async ()=>{
        console.log("next")
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03576bafb64e486f9b384d81315f196d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true})
            let data = await fetch(url);
            let parsedData = await data.json();
            // console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }


    }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News Monkey Top Headlines</h1>
        {this.state.loading &&<Spinner/>}
        <div className="row my-3">
            {!this.state.loading && this.state.articles.map((element) =>{
                return <div className="col-md-4 my-3" key={element.url}>
                    <NewsItems  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div> 
            })}
    
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-lg btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>

            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-lg btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
