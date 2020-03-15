FROM nginx:stable

RUN sed -i 's|worker_processes  1;|worker_processes  auto;|' /etc/nginx/nginx.conf \
    && sed -i 's|server_name  localhost|server_name  _|' /etc/nginx/conf.d/default.conf \
    && sed -i 's|root   /usr/share/nginx/html|root   /app/htdocs/|' /etc/nginx/conf.d/default.conf

COPY build/ /app/htdocs/
