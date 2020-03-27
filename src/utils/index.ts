/**
 * 检查数据类型
 */
export const typesCheck = {
    isPrototype(data) {
        return Object.prototype.toString.call(data).toLowerCase();
    },

    isArray(data) {
        return this.isPrototype(data) === '[object array]';
    },

    isJSON(data) {
        return this.isPrototype(data) === '[object object]';
    },

    isFunction(data) {
        return this.isPrototype(data) === '[object function]';
    },

    isString(data) {
        return this.isPrototype(data) === '[object string]';
    },

    isNumber(data) {
        return this.isPrototype(data) === '[object number]';
    },

    isBoolean(data) {
        return this.isPrototype(data) === '[object boolean]';
    },

    isUndefined(data) {
        return this.isPrototype(data) === '[object undefined]';
    },

    isNull(data) {
        return this.isPrototype(data) === '[object null]';
    },
};

/**
 * 避免内存指向的问题，深克隆对象
 * @param {*} obj  需要克隆的对象
 * @param {Array<Object>} cache 用来缓存已克隆的内容，默认为空，调用函数时不传，递归时使用
 * @return {*}
 */
function find(list: any[], f: any) {
    return list.filter(f)[0];
}

export function deepCopy(obj, cache: any[] = []) {
    // 类型不是object直接返回原值
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // copy完成返回对象，结束递归
    const hit: any = find(cache, c => c.original === obj);
    if (hit) {
        return hit.copy;
    }

    const copy: [] | Record<string, any> = Array.isArray(obj) ? [] : {};

    cache.push({
        original: obj,
        copy,
    });

    // 递归操作
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
}
