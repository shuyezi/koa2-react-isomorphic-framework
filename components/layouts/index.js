/**
 * Created by jimmy on 2017/3/24.
 */

import React, { Component } from 'react';

export default class Layouts extends Component {
    render() {
        const _html = this.props.children || '';
        return (
            <html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui" />
                    <meta content="telephone=no,email=no" name="format-detection" />
                    <title>我是标题</title>
                </head>
                <body className="hold-transition skin-blue fixed sidebar-mini">
                    <div id="wrapper">${_html}</div>
                </body>
            </html>
        );
    }
}