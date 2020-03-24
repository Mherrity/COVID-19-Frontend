import React from 'react'
import {withRouter} from 'react-router-dom'
import * as api from '../../API'
import {ResponsiveLine,Line} from '@nivo/line'
import {MyResponsiveChoropleth} from './CholoroPleth'
import {MyResponsiveLine} from './LineChart'
import {CenteredBox,CenteredFlex} from '../styles'
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
        master_data: null,
        selectedDash: 'StateMap'
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
        return( <React.Fragment>
                <img width='10%' src={RonaPng} Style={{opacity:0.3, width: '10%', position:'absolute', float: 'left'}} />
                  {this.state.selectedDash=='CountriesDash'&& <Selector countries={this.state.countries} 
                                                                        changeState={this.changeState}
                                                                        getCountryData={this.getCountryData}
                                                                        countryData={this.state.countryData} /> }
                    <CenteredFlex>
                    {this.state.subChart&&
                        (this.state.subChart)
                        }
                    </CenteredFlex>
                    <CenteredBox>
                        {this.state.selectedDash=='CountriesDash' &&
                        <React.Fragment>
                        <MyResponsiveLine
                        data={this.state.data}
                        dates={this.state.dates}
                        />
                        </React.Fragment>
                        }
                        {this.state.selectedDash=='StateMap' && this.state.mapData &&
                        <MyResponsiveChoropleth
                        changeState={this.changeState}
                        max = {this.state.stateMax}
                        data = {this.state.mapData}
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
        api.getStateData()
        .then(resp=>{
            let stateMax=0
            
            const mapData = resp.map((data,index)=>{
                const{positive,negative,hospitalized,death} = data 
                stateMax= positive<stateMax ? stateMax : positive
                return { id:data.state,
                        value: positive,
                        positive,
                        negative,
                        hospitalized,
                        death
                    }
            })
            
            this.setState({mapData,stateMax})
        })
    }

}
export default withRouter(MainDash)