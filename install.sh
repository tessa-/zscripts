#!/bin/sh

rm -f ${*}/bin/*.js
for iter in ./*.js
do
    ln -s `pwd`/${iter} ${*}/bin/${iter}
done
