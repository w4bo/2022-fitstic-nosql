#!/bin/bash
set -e
cd mongodb/data
wget http://big.csr.unibo.it/projects/nosql-datasets/games.bson -q
wget http://big.csr.unibo.it/projects/nosql-datasets/restaurants.bson -q
wget http://big.csr.unibo.it/projects/nosql-datasets/yelp-business.bson -q
ls -las
cd -
cd mysql/data
wget http://big.csr.unibo.it/projects/nosql-datasets/foodmart.sql -q
