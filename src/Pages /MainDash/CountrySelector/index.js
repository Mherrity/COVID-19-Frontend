import { Select } from 'antd';
import React from 'react'

const { Option } = Select;
const Children= []
export default class CountrySelector extends React.Component{
    state={
        Children: null
    }
handleChange = (value) => 
    console.log(value)

render(){
    return (
        <React.Fragment>
        {this.state.Children &&
        <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={['US', 'Italy']}
        onChange={this.handleChange}
      >
        {this.state.Children}
      </Select>
        }
        </React.Fragment>
    )
}
componentDidMount(){
    const Children= this.props.countries.map((country,index)=>
       <Option key={index}>{country}</Option>
    )
    this.setState({Children})
}

}

