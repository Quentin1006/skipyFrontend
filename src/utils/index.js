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
    }
    

}