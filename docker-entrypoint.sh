#! /bin/bash

: << !
 @author 任杰

 脚本用于nginx 启动的时候动态修改应用提取出来的配置文件的参数, 目前支持一下两种修改:

    1. 修改 let param= "值" 的形式
    2. 可以修改json的key, 但是对于key必须为唯一的名称, 否则重名的一样会被修改

 修改的是根据当前执行环境的环境变量提取出去进行修改的, 目前注入脚本的修改形式有两种:

    1. 在下方的env_param 或者env_json_param中加入对应的变量, 该变量为读取环境变量的key, 同时也是作为修改文件里面的参数名称
        - env_param 是作为kv形式修改的, 既是 let param = "";的形式
        - env_json_param 是作为json的形式修改, 需要修改的key最好是在中间, 并且以逗号(,)结尾

    2. 根据不同的前缀提供变量进行注入. 启动前会读取系统中的所有变量, 并且根据特定的前缀作为过滤, 分离出kv和json两种配置修改方式, 前缀可以修改, 只需要提供以下环境变量:
        - START_KV_PREFIX 默认为APP_ 判断的时候会以通配符的形式判断, 既是'APP_*'这样的方式来匹配
        - START_JSON_PREFIX 默认为APP_JSON_ 判断的时候会以通配符的形式判断, 既是'APP_JSON_*'这样的方式来匹配
      START_JSON_PREFIX的优先级会比较高
      读取出环境变量后, 会去掉前缀再当作配置的参数去修改, 如'APP_DOCKER_MANAGER_BASE_URL', 去修改的时候会寻找 DOCKER_MANAGER_BASE_URL 来修改
!

file_path=$ENV_FILE_PATH

env_param=(DOCKER_MANAGER_BASE_URL DOCKER_SERVICE_BASE_URL BASE_PERFORMANCE_API MONITOR_PUSH_URL PROXY_PREFIX);
env_json_param=();
KV_PREFIX=$START_KV_PREFIX
JSON_PREFIX=$START_JSON_PREFIX


if test -z "$KV_PREFIX"; then
    KV_PREFIX="APP_"
fi

if test -z "$JSON_PREFIX"; then
    JSON_PREFIX="APP_JSON_"
fi

replaceEnv(){
    if [ $# != 4 ]; then
        echo "funtion using error : arg1 input file_path, arg2 input param_name , arg3 input replace value , arg4 input type"
        exit 1;
    fi;
    param=$2;
    value=$3;
    file_path=$1;
    type=$4
    end_char=';'
    split_char='='
    if [ $type == 'json' ]; then
        # 因为标准的json的key是带双引号的
        param="\"$2\""
        end_char=','
        split_char=':'
    fi
    if [ $value == 'true' -o $value == 'false' ]; then
        echo "$param is boolean"
        echo sed -i 's|\('$param'\s*'$split_char'\s*\).*|\1'"$value"''$end_char'|g'   $file_path
        sed -i 's|\('$param'\s*'$split_char'\s*\).*|\1'"$value"''$end_char'|g'   $file_path
    else
        echo "$param is not boolean"
        echo sed -i 's|\('$param' '$split_char' \).*/\1"'"$value"'"'$end_char'|g'   $file_path
        sed -i 's|\('$param'\s*'$split_char'\s*\).*|\1"'"$value"'"'$end_char'|g'   $file_path
    fi
}

systemEvnHandle() {
    key=$1
    fileKey=''
    type=$2
    if [[ $type == 'json' ]]; then
       fileKey=${key:${#JSON_PREFIX}}
    elif [[ $type == 'kv' ]]; then
       fileKey=${key:${#KV_PREFIX}}
    fi
    echo $file_path $fileKey $(eval echo \$$key) $type;
    replaceEnv $file_path $fileKey $(eval echo \$$key) $type;
}

for env in ${i} ; do
    value=$(eval echo \$$env);
    if [ -n "$value" ];then
        echo $file_path $env $value;
        replaceEnv $file_path $env $(eval echo \$$env) "kv";
    fi
done

for env in ${env_json_param[@]} ; do
    value=$(eval echo \$$env);
    if [ -n "$value" ];then
        echo $file_path $env $value;
        replaceEnv $file_path $env $(eval echo \$$env) "json"
    fi
done

for e in $(env) ; do
    if [[ "$e" == ${JSON_PREFIX}* ]] ; then
        kv=(${e//=/ })
        systemEvnHandle ${kv[0]} 'json'
    elif [[ "$e" == ${KV_PREFIX}* ]] ; then
        kv=(${e//=/ })
        systemEvnHandle ${kv[0]} 'kv'
    fi
done

envsubst '$BACKEND_URL $BACKEND_URL2' < /nginx.conf > /etc/nginx/conf.d/default.conf

cat /usr/share/nginx/html/public/config/env.json

nginx -g 'daemon off;'
