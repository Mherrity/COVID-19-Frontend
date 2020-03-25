import { DatePicker, Form, Button} from 'antd';
import React from 'react'

const { RangePicker } = DatePicker;
export default class extends React.Component{
 handleSubmit=(values)=>{
   let format="M/D/YY"
   let startDate=values[0].format(format)
   let endDate=values[0].format(format)
   console.log(startDate)
   this.props.updateState('dateRange',[startDate,endDate])
 }

render(){
    return (
        <RangePicker onChange={this.handleSubmit}/>
  )
}

}