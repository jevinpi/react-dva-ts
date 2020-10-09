FROM nginx:1.19

COPY ./build /usr/share/nginx/html
COPY docker-entrypoint.sh /
COPY nginx.conf /

# 用于nginx反代
ENV BACKEND_URL="192.168.10.101:5678"
ENV BACKEND_URL2="192.168.10.101:5678"

RUN chmod +x /nginx.conf
ENV ENV_FILE_PATH=config/env.js

WORKDIR /usr/share/nginx/html

CMD /docker-entrypoint.sh

EXPOSE 80
