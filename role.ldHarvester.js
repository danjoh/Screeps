
var roleldHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var workFlag = Game.flags.LD1;
        if(!creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = true;
            creep.say('🔄 harvest');
        }
        if(creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = false;
            creep.say('unload');
        }
        
        if(creep.memory.working) {
            if(creep.room == Game.rooms.W58N6){
                creep.moveTo(workFlag);
            }
            else{
                var newDirection = "";
                if(creep.pos.y == 0){
                    newDirection = BOTTOM;
                }
                else if(creep.pos.y == 49){
                    newDirection = TOP;
                }
                
                if(creep.pos.x == 0){
                    if(newDirection == ""){
                        newDirection = RIGHT;
                    }
                    else{
                        newDirection.concat(_RIGHT);
                    }
                }
                else if(creep.pos.x == 49){
                    if(newDirection == ""){
                        newDirection = RIGHT;
                    }
                    else{
                        newDirection.concat(_LEFT);
                    }
                }
                
                creep.move(newDirection);
                
                /*if(oldX == 0 || oldX == 49 || oldY == 0 || oldY == 49){
                    if(creep.pos.x == 0){
                        
                        
                        newX = 1;
                    }
                    else if(creep.pos.x == 49){
                        newX = 48;
                    }
                    if(creep.pos.y == 0){
                        newY = 1;
                    }
                    else if(creep.pos.y == 49){
                        newY = 48;
                    }
                    creep.moveTo(RoomPosition(parseInt(newX), parseInt(newY), creep.room));
                }*/
                //else{
                var sources = creep.room.find(FIND_SOURCES);
                if(sources.length > 0){
                    if(creep.memory.sourceIndex){
                        if(creep.harvest(sources[creep.memory.sourceIndex]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[creep.memory.sourceIndex], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                    else{
                        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                }
                //}
            }
        }
        else {
            if(creep.room == Game.rooms.W58N6){
                /*if(onBorder(creep.pos.x, creep.pos.y)){
                    moveFromBorder(creep.pos.x, creep.pos.y, creep.room);
                }*/
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    var storageTargets = creep.room.find(FIND_STRUCTURES, {
                        filter: (container) => {
                            return (container.structureType == STRUCTURE_CONTAINER) && container.store[RESOURCE_ENERGY] < container.storeCapacity;
                        }
                    });
                    if(storageTargets.length > 0){
                        if(creep.transfer(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storageTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
            else{
                creep.moveTo(Game.flags.Home1);
            }
        }
    }
};

module.exports = roleldHarvester;