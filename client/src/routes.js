import React from "react";
import {Switch,Route,Redirect} from 'react-router-dom'
import {BoardsPage} from "./pages/BoardsPage";
import {CreateBoard} from "./pages/CreateBoard";
import {DetailBoard} from "./pages/DetailBoard";
import {AuthPage} from "./pages/AuthPage";
export const useRoutes = isAuthenticated=>{
    if (isAuthenticated){
        return(
            <Switch>

                <Route path = "/boards" exact>
                    <BoardsPage/>
                </Route>

                <Route path = "/create" exact>
                    <CreateBoard/>
                </Route>

                <Route path = "/detail/:id">
                    <DetailBoard/>
                </Route>

                <Redirect to="/boards"/>

            </Switch>
        )
    }
    return (
        <Switch>
            <Route path = "/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}