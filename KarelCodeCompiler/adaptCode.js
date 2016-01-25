function adaptCode (commands) {
    commands = commands.replace(/move\(\)/g, "myKarel.move()");
    commands = commands.replace(/turnLeft\(\)/g, "myKarel.turnLeft()");
    commands = commands.replace(/turnRight\(\)/g, "myKarel.turnRight()");
    commands = commands.replace(/pickBeeper\(\)/g, "myKarel.pickBeeper()");
    commands = commands.replace(/putBeeper\(\)/g, "myKarel.putBeeper()");
    commands = commands.replace(/beepersPresent\(\)/g, "myKarel.beepersPresent()");
    commands = commands.replace(/noBeepersPresent\(\)/g, "myKarel.noBeepersPresent()");
    commands = commands.replace(/beepersInBag\(\)/g, "myKarel.beepersInBag()");
    commands = commands.replace(/noBeepersInBag\(\)/g, "myKarel.noBeepersInBag()");
    commands = commands.replace(/facingNorth\(\)/g, "myKarel.facingNorth()");
    commands = commands.replace(/notFacingNorth\(\)/g, "myKarel.notFacingNorth()");
    commands = commands.replace(/facingSouth\(\)/g, "myKarel.facingSouth()");
    commands = commands.replace(/notFacingSouth\(\)/g, "myKarel.notFacingSouth()");
    commands = commands.replace(/facingEast\(\)/g, "myKarel.facingEast()");
    commands = commands.replace(/notFacingEast\(\)/g, "myKarel.notFacingEast()");
    commands = commands.replace(/facingWest\(\)/g, "myKarel.facingWest()");
    commands = commands.replace(/notFacingWest\(\)/g, "myKarel.notFacingWest()");
    commands = commands.replace(/frontIsClear\(\)/g, "myKarel.frontIsClear()");
    commands = commands.replace(/frontIsBlocked\(\)/g, "myKarel.frontIsBlocked()");
    commands = commands.replace(/rightIsClear\(\)/g, "myKarel.rightIsClear()");
    commands = commands.replace(/rightIsBlocked\(\)/g, "myKarel.rightIsBlocked()");
    commands = commands.replace(/leftIsClear\(\)/g, "myKarel.leftIsClear()");
    commands = commands.replace(/leftIsBlocked\(\)/g, "myKarel.leftIsBlocked()");
    commands = commands.replace(/shutDown\(\)/g, "myKarel.crush()");
    return commands;
}