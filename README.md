#zscripts

========

Copyright 2013 "ArchZombie0x" Ryan P. Nicholl <archzombielord@gmail.com>

License for all the files is the GNU AGPLv3+

Suggested install method:

> Symlink all files here to the same folder as the server.
  Then doing git pull will update the scripts on your server. :)

========

Script heiarchy (roughly speaking, multiple inheritance is used):

script
  com
  text
  profile
    security
      chat
        commands <- commandparser
          me_command
          ban_command
          kick_command
      greeting
      gateway
      