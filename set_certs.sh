#!/bin/bash



for i in `ls  /etc/ssl/certs/`; do

    if [[ $i != 'localhost.crt' ]]; then
        cat /etc/ssl/certs/$i >> `pwd`/app/certs/$i
    fi
done


