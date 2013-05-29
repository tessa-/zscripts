#!/bin/sh

for iter in ./*.js
do
    sed 's/\t/    /g' "${iter}" > filename.notabs && mv filename.notabs "${iter}"
done
