import { ResponsiveLine } from '@nivo/line'
import React from 'react'


const getGridXValues=(dates)=>{
   let len=dates.length
   let newDates=[]
   let step=parseInt(len/10)
   let  i=0
    while(i<=len){
        newDates.push(dates[i])
        i=i+step
    }
    return newDates
}


export const MyResponsiveLine = ({data,dates}) =>{ 
    console.log(data)
    return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' , min: 0, max: '', stacked: false, reverse: false}}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        colors= {{scheme:'category10'}}
        //gridXValues={getGridXValues(dates)}
        useMesh={true}
        axisBottom={{
            tickValues: data.length!=0 ? getGridXValues(dates) : [],
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number of Confirmed Cases',
            legendOffset: -50,
            legendPosition: 'middle'
        }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        />
) }