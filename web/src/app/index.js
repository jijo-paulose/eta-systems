import React, { Component } from "react";
import { Provider } from "react-redux";
import { store, history } from "./store";
import Routes from "./router";
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routes history={history} coords={this.props.coords} />
            </Provider>
        );
    }
}
export default App
