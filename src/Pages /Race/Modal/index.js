import React,{useState} from 'react'
import RangePicker from './RangePicker'
import CountrySelector from './CountrySelector'
import styled from 'styled-components'
const FlexCenter=styled.div`
display: flex;
flex-direction: column;
justify-content: center;`

export const ModalMenu = ({countries,updateState}) => {
    return(
        <FlexCenter>
        <CountrySelector countries={countries} updateState={updateState}/>
        <RangePicker updateState={updateState}/>
        </FlexCenter>
    )
}
 