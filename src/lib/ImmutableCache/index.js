class ImmutableCache {
    constructor(size, initialCache= []){
        this._size = size;
        this._cache = initialCache;
    }

    get(){
        return this._cache;
    }


    find(id){
        let match = [];
        try{
            match = this._cache.filter(cachedItem => cachedItem.id === id);
        }
        catch(err){
            console.log(err);
        }

        return match.length > 0 ? match[0] : null; 
    }

    add(item){
        if(!item) return;
        
        const cache = this._cache.slice();
        const cacheLen = cache.length;

        // if already in cache we dont go further
        if(this.find(item)){
            return item;
        }

        if(cacheLen === this._size){
            cache.shift();
        }
        cache.push(item);

        this._cache = cache;

        return item;
    }
    
    clear(){
        this._cache = [];
    }
}

export default ImmutableCache;