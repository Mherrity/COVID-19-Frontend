import React from 'react'
import {withRouter} from 'react-router-dom'
import * as api from '../../API'
import {ResponsiveLine,Line} from '@nivo/line'
import {MyResponsiveLine} from './LineChart'
import {CenteredBox} from '../styles'
import Selector from './CountrySelector'

class MainDash extends React.Component{
    state={
        master_data: null
    }

    changeState=(stateName,value)=>
        this.setState({[stateName]: value})

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
        return( <div>
                  {this.state.countries && <Selector countries={this.state.countries} 
                                                    changeState={this.changeState}
                                                    getCountryData={this.getCountryData}
                                                    countryData={this.state.countryData} /> }
                    <CenteredBox>
                        {this.state.data &&
                        <React.Fragment>
                        <MyResponsiveLine
                        data={this.state.data}
                        dates={this.state.dates}
                        />
                        </React.Fragment>
                        }
                    </CenteredBox>
                </div>
        )
    }
    componentDidMount(){
        api.getCountryData()
        .then((countryData)=>{
            console.log(countryData)
            let selectedCountries=['Italy','US']
            let data=[]
            selectedCountries.forEach((country)=>
                data.push(this.getCountryData(countryData,country))
            )
            console.log(data)
            let countries= Object.keys(countryData)
            console.log(countries)
            this.setState({data, countries, countryData, dates: countryData['Day']},_=>console.log(this.state.data))
        })
    }

}
export default withRouter(MainDash)