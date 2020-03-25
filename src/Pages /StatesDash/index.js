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
                let name = data.state 
                let per_100k = positive/(StatePop[name]/10000)
                if (!isNaN(per_100k)){
                stateMax=  per_100k< stateMax ? stateMax : per_100k
                }
                return { id:data.state,
                        value: per_100k,
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

const StatePop={
    "AL": 4903185,
    "AK": 731545,
    "AZ": 7278717,
    "AR": 3017804,
    "CA": 39512223,
    "CO": 5758736,
    "CT": 3565287,
    "DE": 973764,
    "DC": 705749,
    "FL": 21477737,
    "GA": 10617423,
    "HI": 1415872,
    "ID": 1787065,
    "IL": 12671821,
    "IN": 6732219,
    "IA": 3155070,
    "KS": 2913314,
    "KY": 4467673,
    "LA": 4648794,
    "ME": 1344212,
    "MD": 6045680,
    "MA": 6892503,
    "MI": 9986857,
    "MN": 5639632,
    "MS": 2976149,
    "MO": 6137428,
    "MT": 1068778,
    "NE": 1934408,
    "NV": 3080156,
    "NH": 1359711,
    "NJ": 8882190,
    "NM": 2096829,
    "NY": 19453561,
    "NC": 10488084,
    "ND": 762062,
    "OH": 11689100,
    "OK": 3956971,
    "OR": 4217737,
    "PA": 12801989,
    "RI": 1059361,
    "SC": 5148714,
    "SD": 884659,
    "TN": 6829174,
    "TX": 28995881,
    "UT": 3205958,
    "VT": 623989,
    "VA": 8535519,
    "WA": 7614893,
    "WV": 1792147,
    "WI": 5822434,
    "WY": 578759
}

export default withRouter(StatesDash)
    