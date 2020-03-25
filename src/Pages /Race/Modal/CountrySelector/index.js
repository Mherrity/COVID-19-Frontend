import { Select } from 'antd';
import React from 'react'

const Children= [];
const { Option } = Select;

export default class CountrySelector extends React.Component{
    state={
        Children: null
    }
componentDidMount(){

let len = this.props.countries.length;
let country = this.props.countries;

for (let i = 0; i < len; i++) {
Children.push(<Option key={i} value={country[i]}>{country[i]}</Option>);
      }
this.setState({Children})
    }

handleChange = (values) => {
    //console.log(values)
   // let data= values.map((country)=>this.props.getCountryData(this.props.countryData,country))
    this.props.updateState('selectedCountries', values)
}

render(){
    return (
        <React.Fragment>
       
        {this.state.Children &&
        <Select
        mode="multiple"
        style={{ width: '50%'}}
        placeholder = "Please select the country"
        onChange={this.handleChange}
        defaultValue={['US', 'Italy']}
        allowClear={true}
      >
        {this.state.Children}
        </Select> }
        
        </React.Fragment>
    )
}
}