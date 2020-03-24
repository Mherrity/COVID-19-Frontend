import {executeQueryPOST,externalQueryPOST} from './utils'

export const getCountryData=()=>
    executeQueryPOST('/data/country-data')

export const getStateTimeData=()=>
    executeQueryPOST('/data/state-data')

export const getStateData=()=>
    externalQueryPOST('https://covidtracking.com/api/states')
