#!/bin/sh


if ! test -d "$1"
then
    exec echo Provide a directory to install to, e.g.: ./install.sh ../pokemon-online
else
    install_to=$1
    exec echo Installing to $install_to
    exec ln -s `pwd`/js_modules ${install_to}/bin/js_modules
    exec cp `pwd`/scripts.js ${install_to}/bin 
fi


    
#rm -f ${*}/bin/*.js
#for iter in ./*.js
#do
#    ln -s `pwd`/${iter} ${*}/bin/${iter}
#done
