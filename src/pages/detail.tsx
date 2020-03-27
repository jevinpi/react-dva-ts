import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
function DetailPage() {
    return (
        <div>
            <h2>详情页</h2>
            <Link to="/">回到主页</Link>
        </div>
    );
}

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps)(DetailPage);
