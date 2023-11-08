#!/bin/sh

sh -c "echo -n '${process.env.SRAMS_USER}:' >> /etc/nginx/.htpasswd"
sh -c "echo '${process.env.SRAMS_PASS}' | openssl passwd -apr1 >> /etc/nginx/.htpasswd"
