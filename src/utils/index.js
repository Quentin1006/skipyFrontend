export const deepCopy = (obj) => (JSON.parse(JSON.stringify(obj)));


/**
 * Agit directement sur l'Array
 * @param {Array} fromArr 
 * @param {id} withEltId 
 */
export const setElementUpFront = (fromArr, withEltId) => {
    let idxToSplice = null;
    let objToMoveUpFront = null;

    fromArr.some((obj, idx) => {
        if(obj.id === withEltId){
            idxToSplice = idx;
            objToMoveUpFront = obj;
            return true;
        } 
        return false;  
    });
    
    fromArr.splice(idxToSplice, 1);
    fromArr.unshift(objToMoveUpFront);

}