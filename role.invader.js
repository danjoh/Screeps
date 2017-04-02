var roleInvader = {
    
    /** @param {Creep} creep **/
    run: function(creep, flag){
        if(creep.room != Game.rooms.W57N6){
            creep.moveTo(flag);
        }
        else{
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                var enemyController = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
                if(enemyController){
                    if(creep.attack(enemyController) == ERR_NOT_IN_RANGE){
                        creep.moveTo(enemyController, {vizualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
}

module.exports = roleInvader;