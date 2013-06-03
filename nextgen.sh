#!/bin/sh

for iter in ./*.js
do
    sed 's/this\.module/this\.modules/g' "${iter}" > filename.notabs && mv filename.notabs "${iter}"
done
