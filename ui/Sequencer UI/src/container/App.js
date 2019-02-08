import React, { Component } from 'react';
import './App.css';
import { bindActionCreators } from 'redux';
import {Authenticate, Generator, NextOuput} from '../actions';
import {connect} from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
                    sequencer: 'factorialSeq',
                    generator:'generator',
                    typeRadio:'',
                    params: [] };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.onSequenceChange = this.onSequenceChange.bind(this);
  this.onGeneratorChange = this.onGeneratorChange.bind(this);
  this.onParamsChange = this.onParamsChange.bind(this); 
  this.ongetNextValue = this.ongetNextValue.bind(this); 
  }

  componentWillMount(){
    this.props.Authenticate();
  }

  componentDidMount(){
    document.getElementsByClassName("optional")[0].style.display="none"
  }

  onSequenceChange(event) {
    this.setState({
      sequencer: event.target.value
    });
  }

  onGeneratorChange(event) {
    this.setState({
      generator: event.target.value
    });
    const hiddenDiv = document.getElementsByClassName("optional")[0];
    hiddenDiv.style.display = (this.state.generator==="piped") ? "none":"block";
  }

  handleSubmit(e) {
    this.props.Generator(this.state.generator,
                         this.state.sequencer,
                         (this.state.params[0] || '').split(',').map(Number),
                         localStorage.getItem('token'),
                         this.state.typeRadio);
  }

  setType(event){
    this.setState({
      typeRadio: event.target.value
    });
  }

  onParamsChange(event, location) {
    var input = event.target.value;
    if (input && input.split(',').map(Number).some(isNaN)) {
      return;
    }
    const { params } = this.state;
    this.setState({
      params: [
        ...params.slice(0, location),
        event.target.value,
        ...params.slice(location + 1, params.length)
      ]
    });
  }

  ongetNextValue(){
    this.props.NextOuput(localStorage.getItem('token'),
                          this.state.generator)
  }

  render() {
    const { nextValue, params, sequencer, generator } = this.state;
    const {sequencerOutput} = this.props;
    
    return (
      <div className="App">
        <div className="container">
        <center className="whiteText">
          Sequencer Generator
        </center>
          <div className="row">
            <div className="col-md-6 borderform" >
              <div className="card text-left shadow rounded">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">
                    Simply Select Sequencer from dropdown & enter your input
                  </h6>
                  <form>
                    <div className="form-group">
                      <label>SELECT GENERATOR</label>
                          <select
                            value={generator}
                            className="form-control"
                            onChange={this.onGeneratorChange}
                          >
                        <option value="generator">Sequence</option>
                        <option value="piped">Piped Sequencer</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>SELECT SEQUENCER</label>
                      <select
                        value={sequencer}
                        className="form-control"
                        onChange={this.onSequenceChange}
                      >
                        <option value="factorialSeq">Factorial Seq</option>
                        <option value="fibonacciSeq">Fibonacci Seq</option>
                        <option value="rangeSeq">Range Seq</option>
                        <option value="primeSeq">Prime Seq</option>
                        <option value="partialSumSeq">Partial Sum Seq</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Enter Value</label>
                      <input
                        type="text"
                        value={params[0]}
                        onChange={e => this.onParamsChange(e, 0)}
                        className="form-control"
                      />
                    </div>
                   
                    <div className="optional">
                      <div className="radio"  onChange={this.setType.bind(this)}>
                          <label><input type="radio" name="pipe"  value="isEven" />isEven</label>
                          <label className="radio2"><input type="radio" name="pipe" value="accumulator"/>Accumulator</label>
                      </div>
                      <div className="radio">
                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <button
                        className="btn btn-primary btn-lg btn-block"                      
                        onClick={this.handleSubmit}
                        type="button"
                      >
                        Select
                      </button>
                    </div>
                    <div className="col-md-6">
                    <button
                      className="btn btn-success btn-lg btn-block tealcolor"
                      type="button"
                      onClick={this.ongetNextValue}
                    >
                      Next
                    </button>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="output whiteText">
                OutPut 
                <br/>
                {this.props.sequencerOutput}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  console.log('------', state);
  const  seqOut = state && state.sequencer ? state.sequencer : ''; 
  return{
    sequencerOutput: JSON.stringify(seqOut) // { value: 1, done: false }
  }
   
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({Authenticate,Generator,NextOuput},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
