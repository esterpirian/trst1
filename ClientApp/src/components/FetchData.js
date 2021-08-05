import React, { Component } from 'react';
import { FaAngleDown,FaChevronCircleRight,FaMinusCircle } from 'react-icons/fa';
export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true ,currentCount: 0,result:0,index:-1};
    this.operator = ['+','-','/','*'];
    
    this.ReplaceOperator = this.ReplaceOperator.bind(this);
    this.CalcVal=this.CalcVal.bind(this);
    //this.setVal=this.setVal.bind(this);
  }
  update = (name, e) => {
    this.setState({ [name]: e.target.value });
    
  }
  updateAndCalc= (name, e) => {
    this.setState({ [name]: e.target.value },() => this.CalcVal());
    
  }
   setVal= (val,firstParam,secParam,operator,result) => {
    this.setState({ ['index']: val,['field1']: firstParam,['field2']: secParam,['currentCount']: operator,['result']: result});
    
  }
  componentDidMount() {
    this.populateWeatherData();
  }
  ReplaceOperator() {
    this.setState({
      currentCount: this.state.currentCount==3?0: this.state.currentCount + 1
    },() => this.CalcVal());
  
  }
  CalcVal(sec) {
    if(this.state.field1 && (this.state.field2 ||sec))
    {
      const response =  fetch('MyCalc/CalcVal',{
        crossDomain:true,
        method: 'POST',
       headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
         First:parseInt(this.state.field1),Sec:parseInt(this.state.field2),Operator:this.state.currentCount,Update:parseInt(this.state.index)
        })
       }).then(response => response.json())
       .then(data => this.setState({ result: data.resultCalc,forecasts:data.dataCalc, loading: data.dataCalc.length>0?false:true,index:-1 }));
    }
   
  }
  remove(val) {
    const response =  fetch('MyCalc/RmVal',{
      crossDomain:true,
      method: 'POST',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
      Update:parseInt(val)
     })
     }).then(response => response.json())
     .then(data => this.setState({ forecasts:data, loading: data.length>0?false:true,index:-1 }));
  }
  RmVal(val,firstParam,secParam,operator,result) {
    this.setState({ ['index']: val,['field1']: firstParam,['field2']: secParam,['currentCount']: operator,['result']: result},
    () => this.remove(val));
     
    
   
  }
   renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>calculation hystory</th>
            
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr  key={forecast.key}>
              <td>{forecast.firstParam} {this.operator[forecast.operator]} {forecast.secParam}={forecast.result}<FaMinusCircle onClick={() => this.RmVal(forecast.key,forecast.firstParam,forecast.secParam,forecast.operator,forecast.result)}/><FaChevronCircleRight  onClick={() => this.setVal(forecast.key,forecast.firstParam,forecast.secParam,forecast.operator,forecast.result)}/> </td>
              
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>אין היסטוריה</em></p>
      : this.renderForecastsTable(this.state.forecasts);

    return (
      <form>
  <div class="div-flex">
  <input type="text" name="first" value={this.state.field1} onChange={(e) => this.updateAndCalc("field1", e)}/>
  
  <h3>{this.operator[this.state.currentCount]}</h3>
     <h3><FaAngleDown onClick={this.ReplaceOperator}/> </h3> 
    <input type="text" name="sec" value={this.state.field2} onChange={(e) => this.updateAndCalc("field2", e)}/>
    <h3 onClick={this.CalcVal}>=</h3>
    <h3>{this.state.result}</h3>
  </div>
   
  
  <div>
        {/* <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p> */}
        {contents}
      </div>
</form>
     
    );
  }

  async populateWeatherData() {
    const response =  fetch('MyCalc/Calc',{
      crossDomain:true,
      method: 'POST',
     headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
       First: 2,Sec:3
      })
     }).then(response => response.json())
     .then(data => this.setState({ forecasts: data, loading: data.length>0?false:true }));
    // const data = await response.json();
    // this.setState({ forecasts: data, loading: false });
  }
}
