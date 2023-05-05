#!/bin/bash

# Database migration

#rake db:drop
rake db:create
rake db:migrate
rake db:seed

# Remove PID if already exists in order to start rails sever

if [ -f /our-app/tmp/pids/server.pid ]; then

rm /our-app/tmp/pids/server.pid

fi

# Run web server

bundle exec rails server -b 0.0.0.0 -p 3000