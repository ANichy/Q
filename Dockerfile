FROM unixrepo.q.ru:5000/richxsl/rhel7

ENV REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-bundle.crt
ENV HOME=/app/

ENV ATBS_CREDENTIALS=123:123
ENV repo_host=vlg-teh-hap1t
ENV artifactory_url=http://$repo_host:1146/artifactory
ENV pypi_repo=$artifactory_url/api/pypi/pypi/simple
ENV atbs_utils=$artifactory_url/Atbs-utils

# Выгрузка зависимостей
RUN curl -u $ATBS_CREDENTIALS -O $atbs_utils/artifactory.repo

# Настройка yum
RUN mv artifactory.repo /etc/yum.repos.d/

RUN  yum -y install mc ssh python-devel openldap-devel rh-python36 gcc.x86_64 libxml2-devel.x86_64 libxslt-devel.x86_64 && \
     rm -rf /var/cache/yum

# Set timezone
RUN ln -sf /usr/share/zoneinfo/Asia/Yekaterinburg /etc/localtime

ADD app/requirements.txt /
ADD conf/ conf/
ADD app/ app/
#ADD app/certs /etc/ssl/certs
RUN mkdir /app/cache
RUN mkdir /app/tmp

RUN cd /app &&  \
    source scl_source enable rh-python36 && \
        pip install -r requirements.txt -i $pypi_repo --trusted-host $repo_host && \
        pip install uwsgi -i $pypi_repo --trusted-host $repo_host

WORKDIR /app
ENTRYPOINT cd /app &&  \
    source scl_source enable rh-python36 && \
    uwsgi --master --ini /conf/main.ini

