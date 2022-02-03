#!/bin/bash
set -e
cd mongodb/data
curl -o games.bson http://big.csr.unibo.it/projects/nosql-datasets/games.bson
curl -o restaurants.bson http://big.csr.unibo.it/projects/nosql-datasets/restaurants.bson
curl -o yelp-business.bson http://big.csr.unibo.it/projects/nosql-datasets/yelp-business.bson
ls -las
cd -
cd mysql/data
curl -o foodmart.sql http://big.csr.unibo.it/projects/nosql-datasets/foodmart.sql
