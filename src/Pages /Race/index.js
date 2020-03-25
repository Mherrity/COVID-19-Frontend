import React  from 'react'
import {Sample,RaceChart} from './RaceChart'
import CountrySelector from './Modal/CountrySelector'
import {CenteredBox,TopSelectorFlex,TopSelector} from '../styles'
import Menu from '../Menu'
import RangePicker from './Modal/RangePicker'
import {ModalMenu} from './Modal'
import { Modal, Button } from 'antd';
import * as api from '../../API'
import {withRouter} from 'react-router-dom'


class Race extends React.Component{
state={}

updateState=(name,value)=>this.setState({[name]:value})

showModal=()=>this.setState({visible:true})

incrementData=(index)=>{
    index=index+1
    if(index!=this.state.endIndex){
    let data = this.state.data.map((bar)=>{
     return {
         "id": bar.id,
         "value": this.state.countryData[bar.id][index]
     }
    })
     this.setState({index,data},_=>setTimeout(_=>this.incrementData(this.state.index),1000)) }
 }

handleOK=()=>{
    const {selectedCountries, dateRange, countryData, dates} = this.state

    let index=dates.indexOf(dateRange[0])

    let endIndex= dates.indexOf(dateRange[1])

    let data = selectedCountries.map((country)=>{
        let  listData=countryData[country]
        return {
             id: country,
             value: listData[index]
         }
       })

    this.setState({data,index,endIndex,visible: false},_=>setTimeout(_=>this.incrementData(this.state.index),1000))
}

handleCancel=()=>this.setState({visible: false})

render(){
    return(
        <React.Fragment>
            {this.state.countries &&
            <React.Fragment>

                <TopSelectorFlex>

                    <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <ModalMenu
                    updateState={this.updateState}
                    countries={this.state.countries}
                    />
                    </Modal>
                    <Button type='primary' onClick={this.showModal}>Settings</Button>

                </TopSelectorFlex>
            
                <Menu/>

                <CenteredBox>
                    <RaceChart date={this.state.dates[this.state.index]} data={this.state.data}/>
                </CenteredBox> 
            </React.Fragment>
            }
        </React.Fragment>
    )
}

componentDidMount(){
    api.getCountryData()
        .then((countryData)=>{
          let countries=['US','Italy','China']
           let data= countries.map((country)=>{
            let  listData=countryData[country]
            return {
                 id: country,
                 value: listData[20]
             }
           })

    countries=Object.keys(countryData)
    this.setState({ countries,data, countryData, dates: countryData['Day'] })
})

}


}
export default withRouter(Race);
