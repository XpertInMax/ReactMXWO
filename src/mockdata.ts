const siteIds = [
    { label: 'AK - Arkadelphia' , value: 'AK' }, 
    { label: 'BA - Baltimore' , value: 'BA' }, 
    { label: 'BG - Burgaw' , value: 'BG' }, 
    { label: 'CC - Cedar City' , value: 'CC' }, 
    { label: 'CH - Chester SC' , value: 'CH' }, 
    { label: 'CU - Cumming GA' , value: 'CU' }, 
    { label: 'DA - Dallas' , value: 'DA' }, 
    { label: 'MT - Dallas Manufacturing Technology' , value: 'MT' }, 
    { label: 'NW - Non-Woven' , value: 'NW' }, 
    { label: 'EN - Ennis' , value: 'EN' }, 
    { label: 'PL - Ennis R&D' , value: 'PL' }, 
    { label: 'FO - Fontana' , value: 'FO' }, 
    { label: 'GA - Gainesville' , value: 'GA' }, 
    { label: 'MC - Michigan City' , value: 'MC' }, 
    { label: 'MN - Minneapolis' , value: 'MN' }, 
    { label: 'MV - Mount Vernon' , value: 'MV' }, 
    { label: 'TP - Mount Vernon TPO' , value: 'TP' }, 
    { label: 'MY - Myerstown' , value: 'MY' }, 
    { label: 'NC - New Columbia' , value: 'NC' }, 
    { label: 'RD - Parsippany R&D' , value: 'RD' }, 
    { label: 'SA - Savannah' , value: 'SA' }, 
    { label: 'SB - Statesboro' , value: 'SB' }, 
    { label: 'SH - Shafter Mat (quiesced)' , value: 'SH' }, 
    { label: 'SR - Shafter Shingle' , value: 'SR' }, 
    { label: 'ST - Stockton USI' , value: 'ST' }, 
    { label: 'TA - Tampa' , value: 'TA' }, 
    { label: 'TU - Tuscaloosa' , value: 'TU' }, 
    { label: 'WG - Wind Gap' , value: 'WG'}  
];

const assets = [
    {
        label: 'OVERHEAD BRIDGE CRANES', value: 'CH-0C-700'
    }, {
        label: 'Asset 2', value: 'asset-2'
    }, {
        label: 'Asset 3', value: 'asset-3'
    }, {
        label: 'Asset 4', value: 'asset-4'
    }, {
        label: 'Asset 5', value: 'asset-5'
    }, {
        label: 'Asset 6', value: 'asset-6'
    }, 
];

const workOrderTypes = [
    { label: 'CAL - Calibration' , value: 'CAL' }, 
    { label: 'CM - condition monitoring' , value: 'CM' }, 
    { label: 'CMCAL - Calibration' , value: 'CMCAL' }, 
    { label: 'CP - CAPITAL PROJECT' , value: 'CP' }, 
    { label: 'EMCAL - Calibration' , value: 'EMCAL' }, 
    { label: 'ENV - ENVIRONMENTAL-NON-MAINTENANCE' , value: 'ENV' }, 
    { label: 'EO - NEXT EXTENDED OUTAGE' , value: 'EO' }, 
    { label: 'FW - Follow-Up WO' , value: 'FW' }, 
    { label: 'IW - INCIDENT WORK' , value: 'IW' }, 
    { label: 'LB - LUNCHES AND BREAKS' , value: 'LB' }, 
    { label: 'LC - Life Cycle' , value: 'LC' }, 
    { label: 'LU - Lubrication' , value: 'LU' }, 
    { label: 'M - MEETINGS' , value: 'M' }, 
    { label: 'MM - MACHINE MODIFICATION' , value: 'MM' }, 
    { label: 'NT - Next Time Down' , value: 'NT' }, 
    { label: 'OPS - OPERATIONAL-NON-MAINTENANCE' , value: 'OPS' }, 
    { label: 'PC - PLANNED CORRECTIVE MAINTENANCE' , value: 'PC' }, 
    { label: 'PDM - PREDICTIVE MAINTENANCE' , value: 'PDM' }, 
    { label: 'PM - PREVENTIVE MAINTENANCE' , value: 'PM' }, 
    { label: 'PMCAL - Calibration' , value: 'PMCAL' }, 
    { label: 'REM - REACTIVE EMERGENCY MAINTENANCE' , value: 'REM' }, 
    { label: 'RISK - RISK MANAGMENT' , value: 'RISK' }, 
    { label: 'RNEM - REACTIVE NON-EMERGECY MAINTENANCE' , value: 'RNEM' }, 
    { label: 'SE - SAFETY EMERGENCY' , value: 'SE' }, 
    { label: 'SP - SAFETY PLANNED' , value: 'SP' }, 
    { label: 'CAL - Calibration' , value: 'CAL' }, 
    { label: 'CM - condition monitoring' , value: 'CM' }, 
    { label: 'CMCAL - Calibration' , value: 'CMCAL' }, 
    { label: 'CP - CAPITAL PROJECT' , value: 'CP' }, 
    { label: 'EMCAL - Calibration' , value: 'EMCAL' }, 
    { label: 'ENV - ENVIRONMENTAL-NON-MAINTENANCE' , value: 'ENV' }, 
    { label: 'EO - NEXT EXTENDED OUTAGE' , value: 'EO' }, 
    { label: 'FW - Follow-Up WO' , value: 'FW' }, 
    { label: 'IW - INCIDENT WORK' , value: 'IW' }, 
    { label: 'LB - LUNCHES AND BREAKS' , value: 'LB' }, 
    { label: 'LC - Life Cycle' , value: 'LC' }, 
    { label: 'LU - Lubrication' , value: 'LU' }, 
    { label: 'M - MEETINGS' , value: 'M' }, 
    { label: 'MM - MACHINE MODIFICATION' , value: 'MM' }, 
    { label: 'NT - Next Time Down' , value: 'NT' }, 
    { label: 'OPS - OPERATIONAL-NON-MAINTENANCE' , value: 'OPS' }, 
    { label: 'PC - PLANNED CORRECTIVE MAINTENANCE' , value: 'PC' }, 
    { label: 'PDM - PREDICTIVE MAINTENANCE' , value: 'PDM' }, 
    { label: 'PM - PREVENTIVE MAINTENANCE' , value: 'PM' }, 
    { label: 'PMCAL - Calibration' , value: 'PMCAL' }, 
    { label: 'REM - REACTIVE EMERGENCY MAINTENANCE' , value: 'REM' }, 
    { label: 'RISK - RISK MANAGMENT' , value: 'RISK' }, 
    { label: 'RNEM - REACTIVE NON-EMERGECY MAINTENANCE' , value: 'RNEM' }, 
    { label: 'SE - SAFETY EMERGENCY' , value: 'SE' }, 
    { label: 'SP - SAFETY PLANNED' , value: 'SP'}
];


const woPriority = [
    { label: '0 - Blanket Order' , value: '0' }, 
    { label: '1 - Shutdown' , value: '1' }, 
    { label: '2 - Low' , value: '2' }, 
    { label: '3 - Down Day' , value: '3' }, 
    { label: '4 - Correct within 24 Hours' , value: '4' }, 
    { label: '5 - Urgent' , value: '5'}
];

export {
    siteIds,
    assets,
    workOrderTypes,
    woPriority
}