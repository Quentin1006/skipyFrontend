export const deepCopy = (ofObj) => (JSON.parse(JSON.stringify(ofObj)));


/**
 * Agit directement sur l'Array
 * @param {Array} fromArr 
 * @param {id} withEltId 
 */
export const setElementUpFront = (fromArr, withEltId) => {
    let idxToSplice = -1;
    let objToMoveUpFront = null;

    fromArr.some((obj, idx) => {
        if(obj.id === withEltId){
            idxToSplice = idx;
            objToMoveUpFront = obj;
            return true;
        } 
        return false;  
    });
    
    if(idxToSplice > 0 ){
        fromArr.splice(idxToSplice, 1);
        fromArr.unshift(objToMoveUpFront);
        return true;
    }

    if(idxToSplice === 0)
        return true;

    return false;

}


/**
 * Parse a string into parts mentioning which one should be highlighted
 * @param {*} value 
 * @param {*} query 
 */
export const highlightMatch = (value, query) => {
    let ret = [];
    const qLength = query.length;
    const matchStarting = value.toLowerCase().search(query.toLowerCase());
    
    if(matchStarting < 0 ){
        return ret;
    }
 
    const matchEnding = matchStarting + qLength;

    ret = ret.concat(
        matchStarting > 0 // match is inside the value
        ? [
            {
                text: value.substr(0, matchStarting),
                highlight: false
            },
            {
                text: value.substr(matchStarting, qLength),
                highlight: true
            }
          ]
        : [{
            text: value.substr(0, qLength),
            highlight: true
          }]
    )

    if(matchEnding < value.length){
        ret.push({
            text: value.substr(matchEnding),
            highlight: false
        })
    }

    return ret;
}
