import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

import React from 'react'

function Userstoragechart({fn}) {
  if(fn === null){
    fn = 0
  }
  {console.log(fn,"is filegaaue")}
  return (

    <Gauge
    value={fn}
    startAngle={-100}
    endAngle={100}
    valueMax={10}
    sx={{
      [`& .${gaugeClasses.valueText}`]: {
        fontSize: 30,
        transform: 'translate(3px, -7px)',
      },
    }}
    text={
       ({ value, valueMax }) => `${value} / ${valueMax} Files`
    }
  />
  )
}

export default Userstoragechart