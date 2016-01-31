#! /bin/sh
### BEGIN INIT INFO
# Provides:          mychat
# Required-Start:    $local_fs $remote_fs $network $syslog
# Required-Stop:     $local_fs $remote_fs $network $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Autostart mychat
# Description:       Start-stop-reload production mychat
### END INIT INFO

# Author: ALyabihova

PATH=/sbin:/usr/sbin:/bin:/usr/bin
DESC="mychat on socket.io"
NAME=chat
DAEMON=/usr/sbin/$NAME
DAEMON_ARGS="--options args"
PIDFILE=/var/run/$NAME.pid
SCRIPTNAME=/etc/init.d/$NAME                         
SOURCE_DIR=/home/vagrant/opt/chat         
COMMAND=node                             
SOURCE_NAME=index.js                     
USER=vagrant                           
LOG_FILE=/home/vagrant/log/$NAME.log
forever=forever

start() {
    touch $LOG_FILE
    chown $USER $LOG_FILE

    touch $PIDFILE
    chown $USER $PIDFILE

    sudo -H -u $USER $forever start --pidFile $PIDFILE -l $LOG_FILE -a --sourceDir $SOURCE_DIR -c $COMMAND $SOURCE_NAME

    RETVAL=$?
}

restart() {
    echo -n "Restarting $NAME node instance : "
	cd $SOURCE_DIR
    sudo -H -u $USER $forever restart $SOURCE_NAME
    RETVAL=$?
}

status() {
    echo "Status for $NAME:"
    sudo -H -u $USER $forever list
    RETVAL=$?
}

stop() {
    echo -n "Shutting down $NAME node instance : "
	cd $SOURCE_DIR
    sudo -H -u $USER $forever stop $SOURCE_NAME
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    *)
        echo "Usage:  {start|stop|status|restart}"
        exit 1
        ;;
esac
exit $RETVAL

