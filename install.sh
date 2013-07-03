#!/bin/sh
set -x

if ! test -d "$1"
then
    exec echo Provide a directory to install to, e.g.: ./install.sh ../pokemon-online
else
    install_to=$1
    echo Installing to $install_to
    cp -f `pwd`/scripts.js ${install_to}/bin
    ln -sf `pwd`/js_modules ${install_to}/bin/js_modules
    if ! test -d ${install_to}/bin/js_databases
    then
        mkdir ${install_to}/bin/js_databases
        
    fi
    echo NOTE Symbolic linked js_modules

fi
