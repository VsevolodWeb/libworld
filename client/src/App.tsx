import React, {Suspense} from 'react'
import {Provider} from 'react-redux'
import {Switch, BrowserRouter, Route} from "react-router-dom"

import "./styles/styles.sass"
import store from "./store/store"
import Header from "./components/partials/Header/Header";
import Book from './components/Site/Book/Book'
const Admin = React.lazy(() => import('./components/Admin/Admin'));


const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Header/>
            <div className="container">
                <Switch>
                    <Route path="/admin">
                        <Suspense fallback={<div>Загрузка</div>}>
                            <Admin/>
                        </Suspense>
                    </Route>
                    <Route path="/">
                        <Suspense fallback={<div>Загрузка</div>}>
                            <Book/>
                        </Suspense>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
);


export default App