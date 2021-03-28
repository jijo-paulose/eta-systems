import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Loader from "../components/loader";

export default function asyncComponent(importComponent) {
    class AsyncFunc extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null,
                loading: true
            };
        }
        componentWillMount() {
        }
        componentWillUnmount() {
            this.mounted = false;
        }
        async componentDidMount() {
            if (window.location.pathname === "/") this.setState({ loading: false });
            this.mounted = true;
            const { default: Component } = await importComponent();
            if (this.mounted) {
                this.setState({
                    component: <Component {...this.props} />,
                    loading: false
                });
            }
        }
        render() {
            const Component = this.state.component ||
                <main className="main-inner-wrapper">
                    <Helmet>
                        <title>Delivery App - {this.props.settings && this.props.settings.title ? this.props.settings.title : " "}  </title>
                    </Helmet>
                    <div className="container">
                    </div>
                </main>;
            return this.state.loading ?
                <div className="page-loader">
                    <Loader />
                </div>
                : Component;
        }
    }
    return AsyncFunc;
}
