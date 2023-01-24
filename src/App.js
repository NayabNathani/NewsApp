import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/about';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 9;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }


  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />

        <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country={'in'} category="general"/>}/> 
        <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country={'in'} category="business"/>}/>
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country={'in'} category="entertainment"/>}/>
        <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country={'in'} category="general"/>}/>
        <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country={'in'} category="health"/>}/>
        <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country={'in'} category="science"/>}/>
        <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country={'in'} category="sports"/>}/>
        <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country={'in'} category="technology"/>}/>
        <Route exact path="/about" element={<About/>}/> 

        </Routes>

        </Router>
      </div>
    )
  }
}

