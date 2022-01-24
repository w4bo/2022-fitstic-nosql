#!/bin/bash
set -e

kset() {
  echo "$1,$2" >> kv_database
}

kget() {
  grep "^$1," kv_database | sed -e "s/^$1,//" | tail -n 1
}
