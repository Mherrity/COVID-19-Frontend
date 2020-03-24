import {executeQueryPOST,externalQueryPOST} from './utils'

export const getCountryData=()=>
    executeQueryPOST('/data/country-data')

export const getStateData=()=>
    externalQueryPOST('https://covidtracking.com/api/states')
