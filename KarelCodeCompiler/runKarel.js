var map;
var resultActions = [];
function runKarel(commands, originalMap) {
    map = new Field(originalMap);
    var KarelPosition = map.getKarelPosition();
    var myKarel = new Karel(KarelPosition.x, KarelPosition.y, KarelPosition.direction);

    try {
        eval(commands);
        resultActions.push({command: 'finish'});
    } catch(e) {
        if (resultActions.length > 0 && resultActions[resultActions.length - 1].command !== 'error'){
            resultActions.push({command: 'error', data: {message : e}});
        }
    }
    return {actions: resultActions, resultMap: map.map};
}

