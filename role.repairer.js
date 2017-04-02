var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room != Game.rooms.W58N7){
            creep.moveTo(Game.flags.LD1);
        }
        else{
            if(creep.memory.working && creep.carry.energy == 0) {
                creep.memory.working = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = true;
                creep.say('🚧 repair');
            }
            
            if(!creep.memory.working) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                var nonWallTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;
                    }
                });
                        
                /** TODO: prioritize by shortest distance and importance **/
                if(nonWallTargets.length > 0) {
                    if(creep.repair(nonWallTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(nonWallTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                
                var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
                if(targets.length > 0) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    creep.moveTo(Game.flags.Claim1);
                }
            }
        }
    }
};

module.exports = roleRepairer;