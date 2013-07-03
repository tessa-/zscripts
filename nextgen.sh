#!/bin/sh

for iter in ./js_modules/*.js
do
    sed 's/sys\.exists/sys\.fileExists/g' "${iter}" > filename.notabs && mv filename.notabs "${iter}"
done
