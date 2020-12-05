//entry point to render the complete React app, as
// already indicated in the client-side Webpack configuration object. In client/main.js, we import the root or top-level React component that will contain the whole 
//frontend and render it to the div
 //element with the 'root'

import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'

hydrate(<App/>, document.getElementById('root'))
