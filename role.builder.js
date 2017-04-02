var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('🚧 build');
        }
        
        var myRooms = [Game.rooms.W58N6, Game.rooms.W58N7];

        for(var i = 0; i < myRooms.length; i++){
            if(creep.memory.working) {
                var rampartsToRepairToMin = myRooms[i].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < 2000;
                    }
                });
                if(rampartsToRepairToMin.length > 0){
                    if(creep.repair(rampartsToRepairToMin[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(rampartsToRepairToMin[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                
                var targets = myRooms[i].find(FIND_MY_CONSTRUCTION_SITES);
                if(targets.length > 0) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    var harvestTargets = myRooms[i].find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                        }
                    });
                    if(harvestTargets.length > 0) {
                        if(creep.transfer(harvestTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(harvestTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    else{
                        var storageTargets = myRooms[i].find(FIND_MY_STRUCTURES, {
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
            }
            else {
                var droppedEnergy = myRooms[i].find(FIND_DROPPED_ENERGY);
                if(droppedEnergy.length > 0){
                    if(creep.pickup(droppedEnergy[0] == ERR_NOT_IN_RANGE)){
                        creep.moveTo(droppedEnergy[0], {vizualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                
                var sources = myRooms[i].find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleBuilder;