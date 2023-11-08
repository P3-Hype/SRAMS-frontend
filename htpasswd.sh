#!/bin/sh

sh -c "echo -n 'srams :' >> /etc/nginx/.htpasswd"
sh -c 'echo "$(openssl passwd -apr1 srams)" >> /etc/nginx/.htpasswd'