import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

function IndexPage() {
    return (
        <div>
            <h2>主页</h2>
            <Link to="/detail">前往详情页</Link>
        </div>
    );
}

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps)(IndexPage);
