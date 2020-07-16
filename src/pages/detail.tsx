import React from 'react';
import { Link } from 'react-router-dom';
import './detail.less';
function DetailPage() {
    return (
        <div id="detail">
            <h2>详情页</h2>
            <Link to="/">回到主页</Link>
        </div>
    );
}

export default DetailPage;
