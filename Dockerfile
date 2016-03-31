FROM ordnancesurvey/docker-website-builder:latest
MAINTAINER Souman Trivedi "souman.trivedi@os.uk"

COPY nginx/www/ /var/www

CMD ["nginx"]