import React from 'react'
import { render } from 'react-dom'
import SenkaRank from './components/SenkaRank'
import Test from './components/test'

render(
  <div>
    <SenkaRank/>
    <Test/>
  </div>,
  document.querySelector('#app')
);