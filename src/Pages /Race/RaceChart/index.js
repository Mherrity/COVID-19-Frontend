import React, { useState, useEffect } from 'react'
import { Bar } from '@nivo/bar'
import * as api from '../../../API'


const BarComponent = props => {
    return (
        <g transform={`translate(${props.x},${props.y})`}>
            <rect
                x={-3}
                y={7}
                width={props.width}
                height={props.height}
                fill="rgba(0, 0, 0, .07)"
            />
            <rect width={props.width} height={props.height} fill={props.color} />
            <rect
                x={props.width - 5}
                width={5}
                height={props.height}
                fill={props.borderColor}
                fillOpacity={0.2}
            />
            <text
                x={props.width - 16}
                y={props.height / 2 - 8}
                textAnchor="end"
                dominantBaseline="central"
                fill="black"
                style={{
                    fontWeight: 900,
                    fontSize: 15,
                }}
            >
                {props.data.indexValue}
            </text>
            <text
                x={props.width - 16}
                y={props.height / 2 + 10}
                textAnchor="end"
                dominantBaseline="central"
                fill={props.borderColor}
                style={{
                    fontWeight: 400,
                    fontSize: 13,
                }}
            >
                {props.data.value}
            </text>
        </g>
    )
}


export class Sample extends React.Component{

    state={dates: null}

    incrementData=(index)=>{
       index=index+1
       let data = this.state.data.map((bar)=>{
        return {
            "id": bar.id,
            "value": this.state.countryData[bar.id][index]
        }
       })
        this.setState({index,data},_=>setTimeout(_=>this.incrementData(this.state.index),1000))
    }

    render(){
        return (
         <div>
            {this.state.dates &&
                <React.Fragment>
                <h2 style={{ marginLeft: 60, fontWeight: 400, color: '#555' }}>
                    Confirmed CoronaVirus Cases
                    <strong style={{ color: 'black', fontWeight: 900 }}>{this.state.dates[this.state.index]}</strong>
                </h2>
                <Bar
                    width={800}
                    height={500}
                    layout="horizontal"
                    margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
                    data={this.state.data}
                    indexBy="id"
                    keys={['value']}
                    colors={{ scheme: 'spectral' }}
                    colorBy="indexValue"
                    borderColor={{ from: 'color', modifiers: [['darker', 2.6]] }}
                    enableGridX
                    enableGridY={false}
                    axisTop={{
                        format: '~s',
                    }}
                    axisBottom={{
                        format: '~s',
                    }}
                    axisLeft={null}
                    padding={0.3}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
                    isInteractive={false}
                    barComponent={BarComponent}
                    motionStiffness={170}
                    motionDamping={26}
                />
                </React.Fragment>
            }
            </div>
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

            this.setState({data, countries, countryData,index:20, dates: countryData['Day']},_=>setTimeout(_=>this.incrementData(this.state.index),1000))
        })
    }

}

export const RaceChart=({data, date})=>(
    <React.Fragment>
                <h2 style={{ marginLeft: 60, fontWeight: 400, color: '#555' }}>
                    Confirmed CoronaVirus Cases
                    <strong style={{ color: 'black', fontWeight: 900 }}>{date}</strong>
                </h2>
                <Bar
                    width={800}
                    height={500}
                    layout="horizontal"
                    margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
                    data={data}
                    indexBy="id"
                    keys={['value']}
                    colors={{ scheme: 'spectral' }}
                    colorBy="indexValue"
                    borderColor={{ from: 'color', modifiers: [['darker', 2.6]] }}
                    enableGridX
                    enableGridY={false}
                    axisTop={{
                        format: '~s',
                    }}
                    axisBottom={{
                        format: '~s',
                    }}
                    axisLeft={null}
                    padding={0.3}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
                    isInteractive={false}
                    barComponent={BarComponent}
                    motionStiffness={170}
                    motionDamping={26}
                />
                </React.Fragment>
            
        
)