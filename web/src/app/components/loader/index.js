import React from "react";
import { Spin } from "antd";
let style = {padding:"40px 0"};

export default () => {
    return (
        <div className="center-progress" style={style}>
            <Spin size="large" />
        </div>
    );
};
