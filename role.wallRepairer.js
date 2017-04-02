var roleWallRepairer = {
    //var rampartIndex = 0;

    /** @param {Creep} creep **/
    run: function(creep) {
        var rampartTarget = 75000;
        var rampartIncrease = 10000;
        var repairTarget = 500000;
        
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }
        
        if(!creep.memory.repairing) {
            var sources = creep.room.find(FIND_SOURCES);
            if(sources[1].energy > 0){
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else{
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            /*var ramparts = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_RAMPART);
                } 
            });
            
            var i = ramparts.length;
            if(rampartIndex > i - 1){
                rampartIndex = 0;
                rampartTarget += rampartIncrease;
            }
            else{
                if(ramparts[rampartIndex].hits < rampartTarget){
                    if(creep.repair(ramparts[rampartIndex], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(ramparts[rampartIndex], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }*/
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL ||
                    structure.structureType == STRUCTURE_RAMPART) && structure.hits < structure.hitsMax && structure.hits < repairTarget;
                }
            });
            
            // TODO: auto increment wall health target
            if(targets.length > 0){
                if(targets[0].hits < repairTarget){
                    if(creep.repair(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else{
                repairTarget += 10000;
            }
        }
    }
};

module.exports = roleWallRepairer;