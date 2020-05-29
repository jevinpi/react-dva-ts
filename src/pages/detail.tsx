import React from 'react';
import { Link } from 'dva/router';
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
