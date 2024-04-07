# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:latest

# 删除nginx容器中代码目录中自带的文件
RUN rm /usr/share/nginx/html/*
RUN rm /etc/nginx/nginx.conf

# 传文件进容器
COPY ./dist   /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/
 
# 暴露 80 端口供外部访问
EXPOSE 80