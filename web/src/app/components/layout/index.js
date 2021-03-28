import React, { Component } from "react";

class Layout extends Component {

    render() {
        const { children } = this.props;
        return (
            <React.Fragment>
                <div className="app-body">
                    {children}
                </div>
            </React.Fragment>
        );
    }
}
export default Layout

