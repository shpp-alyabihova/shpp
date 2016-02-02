'use strict';
  var KarelCodeCompiler = (function (){
    var compiler = {};

  function myPrivateFunctionToCompileCodeAndReturnCommands(code, maps, lang='js') {
        var language = lang;
        var result = false;
        var resultActions = [];
        var limitCommands = 1000;
        
        
        // Java and C++ simulation
//======================================================================================================================        
      function adaptCode (commands) {
            if (language == 'java') {
                var idxStart = commands.indexOf("{");
                var idxEnd = commands.lastIndexOf("}");
                commands = commands.substring(idxStart + 1, idxEnd);
            }
            commands = commands.replace(/int /g, "var ");
            commands = commands.replace(/public/g, "");
            commands = commands.replace(/private/g, "");
            commands = commands.replace(/void/g, "function");
            commands = commands.replace(/throws Exception/g, "");
            if (language == 'java')
                commands = commands.replace(/run\(\)/g, "runKarelRunRunRun()");
            else
                commands = commands.replace(/main\(\)/g, "runKarelRunRunRun()");
            commands = `${commands}runKarelRunRunRun();`;
            return commands;
      }
        
    //adapt functions and logging
//======================================================================================================================
      function move() {
            myKarel.move();
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions('move', name);
        }
        function turnLeft() {
            myKarel.turnLeft();
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions('rotate', name, {angle: -1});
        }
        function turnRight() {
            myKarel.turnRight();
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions('rotate', name, {angle: 1});
        }
        function pickBeeper() {
            myKarel.pickBeeper();
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions('pick', name);
        }
        function putBeeper() {
            myKarel.putBeeper();
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions('put', name);
        }
        function beepersPresent() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.beepersPresent();
        }
        function noBeepersPresent() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.noBeepersPresent();
        }
        function facingNorth() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.facingNorth();
        }
        function notFacingNorth() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.notFacingNorth();
        }
        function facingSouth() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.facingSouth();
        }
        function notFacingSouth() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.notFacingSouth();
        }
        function facingEast() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.facingEast();
        }
        function notFacingEast() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.notFacingEast();
        }
        function facingWest() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name,  name);
            return myKarel.facingWest();
        }
        function notFacingWest() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.notFacingWest();
        }
        function frontIsClear() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.frontIsClear();
        }
        function frontIsBlocked() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.frontIsBlocked();
        }
        function rightIsClear() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.rightIsClear();
        }
        function rightIsBlocked() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.rightIsBlocked();
        }
        function leftIsClear() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.rightIsClear();
        }
        function leftIsBlocked() {
            var name = (arguments.callee.toString()).split(' ')[1];
            pushActions(name, name);
            return myKarel.rightIsBlocked();
        }
        
        
  //======================================================================================================================      
        class Field {
          constructor (map) {
            this.map = map;
          }
          isAvailable (x, y) {
            if (y >= 0 && y < this.map.length && x >=0 && x < this.map[y].length){
                return (this.map[y][x] !== 'x');
            }
            return false;
          }
          checkBeeper (x, y) {
            if (this.map[y][x] == '')
                return 0;
            else
                return this.map[y][x];
          }
        }
        var directions = {
            south: 0,
            east: 1,
            north: 2,
            west: 3
        };

        function pushActions(command, originalName, detail){
            var commandsList = {};
            commandsList.command = command;
            commandsList.original = originalName;
            if(detail) {
                commandsList.data = detail;
            }
            resultActions.push(commandsList);
            if (resultActions.length == limitCommands) {
                crash("infinity loop");
            }
        }
        
        class Karel {
          constructor (x, y, direction, beepers=1000) {
            this.x = x;
            this.y = y;
            this.direction = direction;
            this.beeperInBag = beepers;
          }
          beepersPresent() {
             return map.checkBeeper(this.x, this.y) != 0;
          }
          noBeepersPresent() {
            return !this.beepersPresent();
          }
          putBeeper() {
            if (this.beeperInBag){
                map.map[this.y][this.x] = map.checkBeeper(this.x, this.y) + 1;
                this.beeperInBag--;
            }
            else{
                crash('there are no beepers in the bag');
            }
          }
          pickBeeper() {
            if (map.checkBeeper(this.x, this.y)){
                map.map[this.y][this.x] = map.checkBeeper(this.x, this.y) - 1;
                this.beeperInBag++;
            }
            else {
                crash('there are no beepers here');
            }
          }
          noBeepersInBag() {
            return this.beeperInBag === 0;
          }
          beepersInBag() {
            return !this.noBeepersInBag();
          }
          facingNorth() {
            return this.direction === directions.north;
          }
          notFacingNorth() {
            return !this.facingNorth();
          }
          facingSouth() {
            return this.direction === directions.south;
          }
          notFacingSouth() {
            return !this.facingSouth();
          }
          facingWest() {
            return this.direction === directions.west;
          }
          notFacingWest() {
            return !this.facingWest();
          }
          facingEast() {
            return this.direction === directions.east;
          }
          notFacingEast() {
            return !this.facingEast();
          }
          frontIsClear() {
            if (this.direction === directions.south) {
                return (map.isAvailable(this.x, this.y + 1));
            } else if (this.direction === directions.east) {
                return (map.isAvailable(this.x + 1, this.y));
            } else if (this.direction === directions.north) {
                return (map.isAvailable(this.x, this.y - 1));
            } else if (this.direction === directions.west) {
                return (map.isAvailable(this.x - 1, this.y));
            }
            return false;
          }
          frontIsBlocked() {
            return !this.frontIsClear();
          }
          leftIsClear() {
            if (this.direction === directions.south) {
                return (map.isAvailable(this.x + 1, this.y));
            } else if (this.direction === directions.east) {
                return (map.isAvailable(this.x, this.y - 1));
            } else if (this.direction === directions.north) {
                return (map.isAvailable(this.x - 1, this.y));
            } else if (this.direction === directions.west) {
                return (map.isAvailable(this.x, this.y + 1));
            }
            return false;
          }
          leftIsBlocked() {
            return !this.leftIsClear();
          }
          rightIsClear() {
            if (this.direction === directions.south) {
                return (map.isAvailable(this.x - 1, this.y));
            } else if (this.direction === directions.east) {
                return (map.isAvailable(this.x, this.y + 1));
            } else if (this.direction === directions.north) {
                return (map.isAvailable(this.x + 1, this.y));
            } else if (this.direction === directions.west) {
                return (map.isAvailable(this.x, this.y - 1));
            }
            return false;
          }
          rightIsBlocked() {
            return !this.rightIsClear();
          }
          move() {
            var dX = 0, dY = 0, success = 0;
            if (this.direction === directions.south) {
                if (map.isAvailable(this.x, this.y + 1))
                    success = dY = 1;
            } else if (this.direction === directions.east) {
                if (map.isAvailable(this.x + 1, this.y))
                    success = dX = 1;
            } else if (this.direction === directions.north) {
                if (map.isAvailable(this.x, this.y - 1))
                    success = dY = -1;
            } else if (this.direction === directions.west) {
                if (map.isAvailable(this.x - 1, this.y))
                    success = dX = -1;
            }
            if (!success)
                crash('Karel can not move forward');
            else {
                this.x += dX;
                this.y += dY;
            }
          }
          turnLeft() {
            this.direction = (this.direction + 1) % 4;
          }
          turnRight() {
            this.direction = (this.direction - 1) % 4;
          }
        }
        function crash(err_msg) {
            pushActions('error', 'error', {message: err_msg});
            throw resultActions;
        }
        
        var map = new Field(maps.original.map);
        var myKarel = new Karel(maps.original.karel.position[0], maps.original.karel.position[1], maps.original.karel.direction, maps.original.karel.beepers);
        //compare result and final maps samples
//======================================================================================================================

        function compareMaps(templateMaps, resultMap) {
            for (let map = 0; map < templateMaps.length; map++){
                if(compareTwoMaps(templateMaps[map].map, resultMap)) {
                    return true;
                }
            }
            return false;
        }

        function compareTwoMaps(templateMap, resultMap) {
            for (let i = 0; i < templateMap.length; i++) {
                for (let j = 0; j < templateMap[i].length; j++) {
                    if (templateMap[i][j] != resultMap[i][j]) {
                        return false;
                    }
                }
            }
            return true;
        }
        
          //code execution
//======================================================================================================================
        if (language !== 'js')
            code = adaptCode(code);
        try {
            eval(code);
            resultActions.push({command: 'finish'});
        } catch(e) {
            var msg_err = e.toString();
            resultActions.push({command: 'error', data: {message : msg_err.split(' ')[1] + ' is not defined'}});
        }

        if (resultActions[resultActions.length - 1].command == 'finish') {
            result = compareMaps(maps.final, map.map);
        }
        var actionCommands = ['move', 'pick', 'put', 'rotate', 'error', 'finish'];
        var commandList = new Set();
        actionCommands.map(action => commandList.add(action));
        resultAction = resultAction.filter(commands => commandList.has(commands.command));
      

        return {commands: resultActions, result: result};
  }
  compiler.compile = function (userCode, map, lang) {
        var map_clone = JSON.stringify(map);
        return myPrivateFunctionToCompileCodeAndReturnCommands(userCode, JSON.parse(map_clone), lang);
    };
    return compiler
})();