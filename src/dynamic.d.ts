/// <reference types="dva" />

import { ComponentType } from 'react';
import { DvaInstance } from 'dva/index';

declare let dynamic: (opts: {
    app: DvaInstance;
    models?: () => PromiseLike<any>[];
    component: () => PromiseLike<any>;
}) => ComponentType<any>;

export default dynamic;
