// import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export class NewsItems extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props; 
    return (
      <div>
        {/* style={{width: "18rem"}} */}
        <div className="card" >
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '85%', zIndex: '1'}}>{source}</span>
            <img src={imageUrl?imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown Author"} on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItems
