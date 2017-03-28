/**
 * Created by jimmy on 2017/3/28.
 */
import React, { Component } from 'react';

import './index.scss';

export default class CompDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    clickHandle(){
        console.log('click from component');
    }

    render() {
        return(
            <div className="component-demo" onClick={this.clickHandle}>我是组件</div>
        )
    }
}