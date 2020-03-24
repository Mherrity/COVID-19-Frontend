import React from 'react'
import {withRouter} from 'react-router-dom'
import * as api from '../../API'
import {ResponsiveLine,Line} from '@nivo/line'
import {MyResponsiveLine} from './LineChart'
import {CenteredBox,TopSelector} from '../styles'
import {icon} from 'antd'
import Selector from './CountrySelector'
import RonaPic from '../../Assets/Rona.svg'
import RonaPng from '../../Assets/RONA.png'
import Menu from '../Menu'


class MainDash extends React.Component{
    state={
        master_data: null,
    }
/*<img width='10%' src={RonaPng} Style={{opacity:0.3, width: '10%', position:'absolute', float: 'left'}} />*/
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
        return( <React.Fragment>
                <div>
                  {this.state.countries && 
                
                <TopSelector>
                    <Selector countries={this.state.countries} 
                      changeState={this.changeState}
                       getCountryData={this.getCountryData}
                         countryData={this.state.countryData} /> 
                   </TopSelector> }
                   <Menu style={{float: 'left',
                                 position: 'absolute'
                                }}
                     history={this.props.history}
                                />
                  </div>
          
                    <CenteredBox>
                        {this.state.data &&
                        <MyResponsiveLine
                        data={this.state.data}
                        dates={this.state.dates}
                        />
                        }
                    </CenteredBox>
                   
                </React.Fragment>
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
            let countries= Object.keys(countryData)
            this.setState({data, countries, countryData, dates: countryData['Day']},_=>console.log(this.state.data))
        })
    }

}
export default withRouter(MainDash)