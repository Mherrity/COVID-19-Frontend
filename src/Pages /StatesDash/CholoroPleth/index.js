import { ResponsiveChoropleth } from '@nivo/geo'
import {ResponsivePie } from '@nivo/pie'
import React from 'react'
import UsStates from './gz_2010_us_040_00_20m.json'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Width = window.innerWidth
const ToolTip=({value,positive,negative,hospitalized,death})=>(
    <div style={{
                display:'flex',
                flexDirection: 'column',
                alignContent:'center',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                backgroundColor: '#6B726F',
                padding: '2%',
                borderRadius: '10%'}}>
    
    <p>
    <span>
    {`Hospitalized: ${hospitalized?hospitalized:'No Data'}`}
    </span>
    </p>
    <span>
    <p>{`Tested: ${negative+value}`}</p>
    </span>
    <span>
    <p>{`Positive: ${value}`}</p>
    </span>
    <span>
    <p>{`Deaths: ${death?death:0}`}</p>
    </span>
    </div>
)

const CoolerToolTip = ({value,positive,negative,hospitalized,death}) => {
     console.log(value)
    const data =  [
        {
          "id": "death",
          "label": "Deaths",
          "value": death,
          "color": "hsl(239, 70%, 50%)"
        },
        {
          "id": "hosp",
          "label": "Hospitalized",
          "value": hospitalized,
          "color": "hsl(188, 70%, 50%)"
        },
        {
          "id": "negative",
          "label": "Tested Negative",
          "value": negative,
          "color": "hsl(163, 70%, 50%)"
        },
        {
          "id": "positive",
          "label": "Tested Positive",
          "value": positive,
          "color": "hsl(289, 70%, 50%)"
        }
      ]
      return (
        <div style={{height: '30vh', 
            right: 10,
            width: '100%'
        }}>

        <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        enableSlicesLabels={false}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
    />
    </div>
) 
}



/*({death,positive,negative,hospitalized})=>(
    <h1>{positive}</h1>
)*/
export const MyResponsiveChoropleth = ({ changeState, data,max }) => (
    <ResponsiveChoropleth
        data={data}
        features={UsStates.features}
        //projectionType='m'
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[ 0, max ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={Width/3}
        projectionTranslation={[ 1.2, 1.3 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        tooltip={(e)=>ToolTip(e.feature.data)}
        onClick={(e)=>changeState('selectedState',e.properties.NAME) }
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#444444',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)
