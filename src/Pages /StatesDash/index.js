import React from 'react'
import {withRouter} from 'react-router-dom'
import * as api from '../../API'
import {MyResponsiveLine} from '../MainDash/LineChart'
import {MyResponsiveChoropleth} from '../StatesDash/CholoroPleth'
import {CenteredBox,TopSelector} from '../styles'
import Menu from '../Menu'
import {icon} from 'antd'
import RonaPic from '../../Assets/Rona.svg'
import RonaPng from '../../Assets/RONA.png'



class StatesDash extends React.Component{
    state={

    }

    makeLineData=()=>{
        let master_data={}
        const{timeData,selectedState}=this.state
        let STATE = timeData[selectedState]
        let data=this.state.dates.map((date,index)=>
        {
            return  {x:date, y: STATE[index]}
        }
        )
        master_data['data']=data
        master_data['id']=selectedState
        master_data['color']="hsl(66, 70%, 50%)"
        
        return [master_data]
    }

    changeState=(stateName,value)=>{
        this.setState({[stateName]: value})
    }
   
    render(){
        return( <React.Fragment>
                 <Menu history={this.props.history}/>
                    <TopSelector top='2vh'>
                    <div style={{height: '25vh',width:'75%'}}>
                    {this.state.selectedState &&
                        <MyResponsiveLine data= {this.makeLineData()} dates={this.state.dates} />
                        }
                    </div>
                    </TopSelector>
                    <CenteredBox>
                        {this.state.mapData &&
                        <React.Fragment>
                        <MyResponsiveChoropleth
                        changeState={this.changeState}
                        max = {this.state.stateMax}
                        data = {this.state.mapData}
                        />
                        </React.Fragment>
                        }
                    </CenteredBox>
                </React.Fragment>
        )
    }
    componentDidMount(){
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
        api.getStateTimeData().then(resp=>this.setState({timeData:resp, dates: resp.Day }))
            this.setState({mapData,stateMax})
        })
    }

}

export default withRouter(StatesDash)
    