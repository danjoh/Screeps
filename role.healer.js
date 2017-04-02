var roleHealer = {
    
    /** @param {Creep} creep **/
    run: function(creep){
        var friendlies = creep.room.find(FIND_MY_CREEPS, {
            filter: (friendly) => {
                friendly.hits < friendly.hitsMax;
            }
        });
        if(friendlies > 1){
            var closestFriendly = creep.pos.findClosestByRange(friendlies);
            if(creep.heal(closestFriendly) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestFriendly, {visualizePathStyle: {stroke: '#00ff00'}});
            }
        }
    }
}

module.exports = roleHealer;