import React, { Component } from 'react'
import spinner from './loading.gif'

export class loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={spinner} alt="" />
      </div>
    )
  }
}

export default loading
