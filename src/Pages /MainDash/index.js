import React from 'react'
import {withRouter} from 'react-router-dom'
import * as api from '../../API'
import {ResponsiveLine,Line} from '@nivo/line'
import {MyResponsiveLine} from './LineChart'
import {CenteredBox} from '../styles'

class MainDash extends React.Component{
    state={
        master_data: null
    }

    getCountryData=(countryData,country)=>{
        let master_data={}
        let COUNTRY=countryData[country]
        let data=countryData.Day.map((date,index)=>
        {
            return  {x:date, y: COUNTRY[index]}
        }
        )
        master_data['data']=data
        master_data['id']=country
        master_data['color']="hsl(66, 70%, 50%)"
        console.log(master_data)
        return master_data
       // this.setState({master_data},_=>console.log(this.state.master_data))
    }
   
   
    render(){
       //let {data} =this.state.master_data
        return(
                <CenteredBox>
                    {this.state.data &&
                    <MyResponsiveLine
                    data={this.state.data}
                    dates={this.state.dates}
                    />
                     }
                </CenteredBox>
        )
    }
    componentDidMount(){
        api.getCountryData()
        .then((countryData)=>{
            let Countries=['Italy','US']
            let data=[]
            Countries.forEach((country)=>
                data.push(this.getCountryData(countryData,country))
            )
            console.log(data)
            this.setState({data, countryData, dates: countryData['Day']},_=>console.log(this.state.data))
        })
        ///this.getCountryData(countryData))
        //.catch(()=>alert('haha'))
    }

}
export default withRouter(MainDash)