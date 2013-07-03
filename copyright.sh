#!/bin/sh

for iter in ./*.js
do
    cat COPYING "${iter}" > filename.notabs && mv filename.notabs "${iter}"
done
