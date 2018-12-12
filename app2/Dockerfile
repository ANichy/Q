FROM unixrepo.q.ru:5200/q:latest

WORKDIR /
RUN rm -rf conf
ADD conf/ conf/

WORKDIR /app
ENTRYPOINT cd /app &&  \
    source scl_source enable rh-python36 && \
    uwsgi --master --ini /conf/main.ini
