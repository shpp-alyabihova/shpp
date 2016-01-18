
function compareMaps(templateMap, resultMap) {
    for (var i = 0; i < templateMap.length; i++) {
        for (var j = 0; j < templateMap[i].length; j++) {
            if (resultMap[i][j] == 'v' || resultMap[i][j] == '>' || resultMap[i][j] == '<' || resultMap[i][j] == '^') {
                resultMap[i][j] = '';
            }
            if (templateMap[i][j] != resultMap[i][j]) {
                return false;
            }
        }
    }
    return true;
}

