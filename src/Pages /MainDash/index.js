import React from 'react'
import {withRouter} from 'react-router-dom'
import * as api from '../../API'
import {ResponsiveLine,Line} from '@nivo/line'
import {MyResponsiveLine} from './LineChart'
import {CenteredBox} from '../styles'
import {icon} from 'antd'
import Selector from './CountrySelector'
import RonaPic from '../../Assets/Rona.svg'
import RonaPng from '../../Assets/RONA.png'
const SVG = ({
    style = {},
    fill = 'black',
    width = '100%',
    className = '',
    height = '100%',
    viewBox = '0 0 32 32',
  }) => 
    <svg
      width={width}
      style={style}
      height={height}
      viewBox={viewBox}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <path d={RonaPic} fill={fill} />
    </svg>;


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
        return( <React.Fragment>
                <img width='10%' src={RonaPng} Style={{opacity:0.3, width: '10%', position:'absolute', float: 'left'}} />
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
            console.log(data)
            let countries= Object.keys(countryData)
            console.log(countries)
            this.setState({data, countries, countryData, dates: countryData['Day']},_=>console.log(this.state.data))
        })
    }

}
export default withRouter(MainDash)