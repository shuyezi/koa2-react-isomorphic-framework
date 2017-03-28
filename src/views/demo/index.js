/**
 * Created by jimmy on 2017/3/24.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

//components
import CompDemo from '../../../components/demo';

export default class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    buttonHandle(){
        console.log('clicked');
    }
    render() {
         const data = this.props.data;
         return(
             <div>
                 My name is {data.name},<br />
                 I am {data.age}
                 <br />
                 <div className="test">1112233</div>
                 <br />
                 <br />
                 <button onClick={this.buttonHandle.bind(this)}>点我111</button>
                 <br />
                 组件看这里：<CompDemo />
             </div>
         );
     }
}

if (typeof window !== 'undefined') {
    ReactDOM.render(
        <Demo data={window.APP.pageData}/>,
        document.getElementById('wrapper')
    );
}
