import React from 'react'
import {Provider} from 'react-redux'
import Admin from "./Admin/Admin"
import store from "./redux/store"


const App = () => (
  <Provider store={store}>
    <Admin/>
  </Provider>
);


export default App