/// <reference types="dva" />

import { ComponentType } from 'react';
import { DvaInstance } from 'dva/index';

interface DynamicInstance {
    app: DvaInstance;
    models?: () => PromiseLike<any>[];
    component: () => PromiseLike<any>;
}

declare const dynamic: (opts: {
    app: DvaInstance;
    models?: () => PromiseLike<any>[];
    component: () => PromiseLike<any>;
}) => ComponentType<any>;

export default dynamic;
