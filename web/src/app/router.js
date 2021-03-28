import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import asyncComponent from "./helpers/async-func";
import Layout from "./components/layout";


const PublicRoute = ({ component: Component, layoutSettings = {}, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            <Layout settings={layoutSettings}>
                <Component {...props} settings={layoutSettings} />
            </Layout>
        }
    />
);

export default class extends Component {

    render() {
        const { history,coords } = this.props;

        return (
            <Router history={history}>
                <LastLocationProvider> 
                    <Switch>
                        
                        <PublicRoute
                            exact
                            path={"/"}
                            layoutSettings={{
                                title: "Home",
                                coords:coords,
                                topbar:false,
                                sidebar:false
                            }}
                            component={asyncComponent(() => import("./pages/delivery"))}
                        /> 
                       
                    </Switch>
                </LastLocationProvider>   
            </Router>
        );
    }
}
