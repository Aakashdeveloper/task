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
                    params: [],
                    seqout:'',
                    disabled:true };

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
    document.getElementsByClassName("optional")[0].style.display="none";
    //document.getElementsByClassName('enterVal')[0].style.display="none";
  }

  onSequenceChange(event) {
    this.setState({
      sequencer: event.target.value,
      disabled:true
    });
    //const hiddenDiv = document.getElementsByClassName("enterVal")[0];
   // hiddenDiv.style.display = (this.state.sequencer==="rangeSeq") ? "block":"none";
  }

  onGeneratorChange(event) {
    this.setState({
      generator: event.target.value,
      disabled:true
    });
    const hiddenDiv = document.getElementsByClassName("optional")[0];
    hiddenDiv.style.display = (this.state.generator==="piped") ? "none":"block";
  }

  handleSubmit(e) {
    this.props.Generator(this.state.generator,
                         this.state.sequencer,
                         (this.state.params[0]? this.state.params[0].split(',').map(Number):[]),
                         localStorage.getItem('token'),
                         this.state.typeRadio);
    this.setState({
      disabled:false
    });
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
        <br/>
          <div className="row">
            <div className="col-md-6 borderform" >
              <div className="card text-left shadow rounded">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted whiteText">
                    Simply Select Sequencer from dropdown & enter your input
                  </h6>
                  <form>
                    <div className="form-group whiteText">
                      <label>Select Generator</label>
                          <select
                            value={generator}
                            className="form-control"
                            onChange={this.onGeneratorChange}
                          >
                        <option value="generator">Sequence</option>
                        <option value="piped">Piped Sequencer</option>
                      </select>
                    </div>
                    <div className="form-group whiteText">
                      <label>Select Sequencer</label>
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


                      <div className="form-group whiteText">
                        <label>Enter Value (optional)</label>
                        <input
                          type="text"
                          value={params[0]}
                          onChange={e => this.onParamsChange(e, 0)}
                          className="form-control"
                          placeholder="Enter number with comma separated ex: 1,2"
                          
                          
                        />
                      </div>

                   
                   
                    <div className="optional whiteText">
                    <label>Select Pipe</label>
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
                        GO
                      </button>
                    </div>
                    <div className="col-md-6 nextbtn">
                      <button
                        className="btn btn-success btn-lg btn-block tealcolor"
                        type="button"
                        onClick={this.ongetNextValue}
                        disabled = {this.state.disabled}
                      >
                        Next
                      </button>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="output redText">
                Output
                <br/><br/><br/><br/>
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
  // console.log('------>>>>', JSON.parse(state.sequencer));
  const  seqOut = state && state.sequencer ? state.sequencer : ''; 
  
  console.log('------>>>>', seqOut);
  return{
    sequencerOutput: JSON.stringify(seqOut) // { value: 1, done: false }
  }
  
   
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({Authenticate,Generator,NextOuput},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
