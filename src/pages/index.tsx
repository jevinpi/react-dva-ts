import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

function IndexPage() {
    return (
        <div id="home">
            <h2>主页</h2>
            <Link to="/detail">前往详情页</Link>
        </div>
    );
}

export default IndexPage;
