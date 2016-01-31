#!/bin/bash

SERVICE_NAME=chat
MAIN_DIR="/home/vagrant/opt"
NAME_DIR=chat
AUTOSTART_NAME=chat_init.sh
BACK_UP="/home/vagrant/tmp/$NAME_DIR"
LOG=/home/vagrant/log
INIT=/etc/init.d/
AUTOSTART=$INIT/$SERVICE_NAME
GIT_CHAT="https://github.com/shpp-alyabihova/chat.git"
mkdir -p $LOG
mkdir -p $MAIN_DIR/node_modules
mkdir -p $BACK_UP 2> /dev/null

CHECK_INSTALL=`dpkg -s $PACKEGE | grep "Status"`
CHECK_DEINSTALL=`dpkg -s $PACKEGE | grep "Status" | grep "deinstall"`
for app in curl git mc
do
	PACKEGE=app
	I=$CHECK_INSTALL
	D=$CHECK_DEINSTALL
	if [[ ! -n "$I" ||  -n "$P" ]] ; then
		echo "installing $app..."
		sudo apt-get -y install $app
	else 
		echo "$app has been already installed"
	fi
done

if [ -n "`dpkg -s nodejs | grep "Status"`" ]; then
	echo "remove node.js and npm"
	sudo apt-get -y remove nodejs nodejs-dev npm
fi

echo "installing node.js and npm..."
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get -y install nodejs
sudo npm -g install npm@latest
echo "installing forever..."
sudo npm -y install forever -g
cd $MAIN_DIR


if [ -n "`ls -A $MAIN_DIR`" ]; then
		echo "execute back up"
		cp -f $MAIN_DIR/* $BACK_UP
		sudo rm -r $SERVICE_NAME
fi
for module in express socket.io mysql
do
	echo "installing $module..."
	sudo npm -y install $module
done


echo "download source chat..."
sudo git clone $GIT_CHAT
cd SERVICE_NAME
#sudo npm install <pkg> --save-dev

if [ -f $AUTOSTART ]; then
	cd $INIT
	sudo rm $SERVICE_NAME
fi


echo "create autorun chat"
sudo cp $MAIN_DIR/$NAME_DIR/$AUTOSTART_NAME $AUTOSTART
sudo chmod a+x $AUTOSTART
sudo update-rc.d $SERVICE_NAME defaults

	

