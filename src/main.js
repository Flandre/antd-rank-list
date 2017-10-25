import React from 'react'
import { render } from 'react-dom'
import appState from './mobx/appState'
import MainLayout from './components/MainLayout'

render(<MainLayout appState={appState}/>, document.querySelector('#app'));