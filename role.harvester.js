var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(!creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = true;
            creep.say('🔄 harvest');
        }
        if(creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = false;
            creep.say('unload');
        }
        
        if(creep.memory.working) {
            var sources = creep.room.find(FIND_SOURCES);
            if(sources[1].energy > 0 && creep.room == Game.rooms.W58N6){
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else if(sources[1].energy == 0 && sources[0].energy > 0){
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else{
                if(creep.room != Game.rooms.W58N7){
                    creep.moveTo(Game.flags.LD1);
                }
                else{
                    if(Game.rooms.W58N6.find(FIND_SOURCES)[1].energy > 0){
                        creep.moveTo(Game.flags.Home1);
                    }
                    else{
                        //var closestSource = creep.pos.findClosestByRange(FIND_SOURCES);
                        var sources = Game.rooms.W58N7.find(FIND_SOURCES);
                        if(sources.length > 0 && sources.energy > 0){
                            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        }
                    }
                }
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            if(creep.room != Game.rooms.W58N7){
                var towers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else if(towers.length > 0){
                    if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
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

module.exports = roleHarvester;