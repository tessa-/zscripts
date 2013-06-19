#!/bin/sh

rm ../pokemon-online/bin/*.js
for iter in ./*.js
do
    ln -s `pwd`/${iter} ../pokemon-online/bin/${iter}
done
