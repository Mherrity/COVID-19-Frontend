import {executeQueryPOST} from './utils'

export const getCountryData=()=>
    executeQueryPOST('/data/country-data')