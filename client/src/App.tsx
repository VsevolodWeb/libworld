import React, {Suspense} from 'react'
import {Provider} from 'react-redux'
import {Switch, BrowserRouter, Route} from "react-router-dom";
import store from "./redux/store"
const Admin = React.lazy(() => import('./Admin/Admin'));


const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/admin">
                    <Suspense fallback={<div>Загрузка</div>}>
                        <Admin/>
                    </Suspense>
                </Route>
            </Switch>
        </BrowserRouter>
    </Provider>
);


export default App