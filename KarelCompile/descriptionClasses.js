function Field(map) {
    this.map = map;
}

function Karel(x, y, direction, beepers) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.beeperInBag = beepers || 1000;
}

Field.prototype.isAvailable = function (x, y) {
    if (y >= 0 && y < this.map.length && x >=0 && x < this.map[y].length){
        return (this.map[y][x] !== 'x');
    }
    return false;
};

Field.prototype.checkBeeper = function (x, y) {
    if (this.map[y][x] == '' || this.map[y][x] == 'v' || this.map[y][x] == '>' || this.map[y][x] == '<' || this.map[y][x] == '^')
        return 0;
    else
        return this.map[y][x];
};

Field.prototype.getKarelPosition = function () {
    for (var i = 0; i < this.map.length; i++) {
        for (var j = 0; j < this.map[i].length; j++) {
            if (this.map[i][j] === 'v') {
                return {x: j, y: i, direction: 0};
            } else if (this.map[i][j] === '>') {
                return {x: j, y: i, direction: 1};
            } else if (this.map[i][j] === '^') {
                return {x: j, y: i, direction: 2};
            } else if (this.map[i][j] === '<') {
                return {x: j, y: i, direction: 3};
            }
        }
    }
};

//compatibility with beepers
//======================================================================================================================
Karel.prototype.beepersPresent = function () {
    return map.checkBeeper(this.x, this.y) != 0;
};

Karel.prototype.noBeepersPresent = function () {
    return !this.beepersPresent();
};

Karel.prototype.putBeeper = function () {
    var commandsList = {};
    if (this.beeperInBag){
        map.map[this.y][this.x] = map.checkBeeper(this.x, this.y) + 1;
        this.beeperInBag--;
        commandsList.command = 'put';
    }
    else{
        this.crash('There are no beepers in the bag');
    }
    resultActions.push(commandsList);
};

Karel.prototype.pickBeeper = function () {
    var commandsList = {};
    if (map.checkBeeper(this.x, this.y)){
        map.map[this.y][this.x] = map.checkBeeper(this.x, this.y) - 1;
        this.beeperInBag++;
        commandsList.command = 'pick';
    }
    else {
        this.crash('There are no beepers here');
    }
    resultActions.push(commandsList);
};

Karel.prototype.noBeepersInBag = function () {
    return this.beeperInBag === 0;
};

Karel.prototype.beepersInBag = function () {
    return !this.noBeepersInBag();
};

//check direction
//======================================================================================================================
Karel.prototype.facingNorth = function () {
    return this.direction == '2';
};

Karel.prototype.notFacingNorth = function () {
    return !this.facingNorth();
};

Karel.prototype.facingSouth = function () {
    return this.direction == '0';
};

Karel.prototype.notFacingSouth = function () {
    return !this.facingSouth();
};

Karel.prototype.facingWest = function () {
    return this.direction == '3';
};

Karel.prototype.notFacingWest = function () {
    return !this.facingWest();
};

Karel.prototype.facingEast = function () {
    return this.direction == '1';
};

Karel.prototype.notFacingEast = function () {
    return !this.facingEast();
};


//check front
//======================================================================================================================

Karel.prototype.frontIsClear = function () {
    if (this.direction == '0') {
        return (map.isAvailable(this.x, this.y + 1));
    } else if (this.direction == '1') {
        return (map.isAvailable(this.x + 1, this.y));
    } else if (this.direction == '2') {
        return (map.isAvailable(this.x, this.y - 1));
    } else if (this.direction == '3') {
        return (map.isAvailable(this.x - 1, this.y));
    }
    return false;
};

Karel.prototype.frontIsBlocked = function () {
    return !this.frontIsClear();
};

Karel.prototype.leftIsClear = function () {
    if (this.direction == '0') {
        return (map.isAvailable(this.x + 1, this.y));
    } else if (this.direction == '1') {
        return (map.isAvailable(this.x, this.y - 1));
    } else if (this.direction == '2') {
        return (map.isAvailable(this.x - 1, this.y));
    } else if (this.direction == '3') {
        return (map.isAvailable(this.x, this.y + 1));
    }
    return false;
};

Karel.prototype.leftIsBlocked = function () {
    return !this.leftIsClear();
};

Karel.prototype.rightIsClear = function () {
    if (this.direction == '0') {
        return (map.isAvailable(this.x - 1, this.y));
    } else if (this.direction == '1') {
        return (map.isAvailable(this.x, this.y + 1));
    } else if (this.direction == '2') {
        return (map.isAvailable(this.x + 1, this.y));
    } else if (this.direction == '3') {
        return (map.isAvailable(this.x, this.y - 1));
    }
    return false;
};

Karel.prototype.rightIsBlocked = function () {
    return !this.rightIsClear();
};


// move()
//======================================================================================================================
Karel.prototype.move = function () {
    var dX = 0, dY = 0, err = false, commandsList = {};
    if (this.direction == '0') {
        if (map.isAvailable(this.x, this.y + 1)) {
            dY = 1;
        } else {
            err = true;
        }
    } else if (this.direction == '1') {
        if (map.isAvailable(this.x + 1, this.y)) {
            dX = 1;
        } else {
            err = true;
        }
    } else if (this.direction == '2') {
        if (map.isAvailable(this.x, this.y - 1)) {
            dY = -1;
        } else {
            err = true;
        }
    } else if (this.direction == '3') {
        if (map.isAvailable(this.x - 1, this.y)) {
            dX = -1;
        } else {
            err = true;
        }
    }
    if (err) {
        this.crash('Karel can not move forward');
    }
    else {
        this.x += dX;
        this.y += dY;
        commandsList.command = 'move';
    }
    resultActions.push(commandsList);
};

//turnLeft(), turnRight()
//======================================================================================================================
Karel.prototype.turnLeft = function () {
    var commandsList = {};
    this.direction = (this.direction + 1) % 4;
    commandsList.command = 'rotate';
    commandsList.data = {};
    commandsList.data.angle = -1;
    resultActions.push(commandsList);
};

Karel.prototype.turnRight = function () {
    var commandsList = {};
    this.direction = (this.direction - 1) % 4;
    commandsList.command = 'rotate';
    commandsList.data = {};
    commandsList.data.angle = 1;
    resultActions.push(commandsList);
};

//crash
//======================================================================================================================
Karel.prototype.crash = function (err_msg){
    var commandsList = {};
    commandsList.command = 'error';
    commandsList.data = {};
    commandsList.data.message = err_msg;
    resultActions.push(commandsList);
    throw commandsList;
};

//======================================================================================================================