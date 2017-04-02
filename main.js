require('prototype.spawn')();

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleTransfer = require('role.transfer');
var roleReserver = require('role.reserver');
var roleldHarvester = require('role.ldHarvester');

var roleMeleeFighter = require('role.meleeFighter');
var roleRangedDPS = require('role.rangedDPS');
var roleHealer = require('role.healer');
var roleInvader = require('role.invader');

module.exports.loop = function() {
    
    /** Reaps zombie creeps from memory **/
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var wallRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallRepairer');
    var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver');
    var ldHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'ldHarvester');
    
    var meleeFighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeFighter');
    var rangedDPS = _.filter(Game.creeps, (creep) => creep.memory.role == 'rangedDPS');
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    var invaders = _.filter(Game.creeps, (creep) => creep.memory.role == 'invader');
    
    var currentEnergy = Game.spawns.Spawn1.room.energyAvailable;
    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    
    var spawnIndex;
    
    // In case of colossal fuckup
    if(harvesters.length == 0 && 200 <= energy < 550){
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName + ' #' + harvesters.length);
    }
    
    var hostiles = Game.rooms.W58N6.find(FIND_HOSTILE_CREEPS);
    var invasionFlag = Game.flags.LD1;
    var claimFlag = Game.flags.Claim1;
    var ldHarvIndex;
    
    if(currentEnergy == energy){
        if(harvesters.length < 2){
            //var newName = Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], undefined, {role: 'harvester'});
            var newName = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
            console.log('Spawning new harvester: ' + newName + ' #' + harvesters.length);
        }
        else if(ldHarvesters.length < 3){
            if(ldHarvIndex != 0){
                ldHarvIndex = 0;
            }
            else{
                ldHarvIndex = 1;
            }
            //var newName = Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], undefined, {role: 'ldHarvester', spawnIndex: ldHarvIndex});
            var newName = Game.spawns.Spawn1.createCustomCreep(energy, 'ldHarvester');
            console.log('Spawning new long distance harvester: ' + newName + ' #' + ldHarvesters.length);
        }
        else if(builders.length < 1){
            //var newName = Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], undefined, {role: 'builder'});
            var newName = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
            console.log('Spawning new builder: ' + newName + ' #' + builders.length);
        }
        else if(upgraders.length < 3){
            //var newName = Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], undefined, {role: 'upgrader'});
            var newName = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
            console.log('Spawning new upgrader: ' + newName + ' #' + upgraders.length);
        }
        else if(repairers.length < 1){
            //var newName = Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], undefined, {role: 'repairer'});
            var newName = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
            console.log('Spawning new repairer: ' + newName + ' #' + repairers.length);
        }
        else if(wallRepairers.length < 0){
            //var newName = Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], undefined, {role: 'wallRepairer'});
            var newName = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer');
            console.log('Spawning new wall repairer: ' + newName + ' #' + wallRepairers.length);
        }
        else if(reservers.length < 2){
            //var newName = Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK], undefined, {role: 'reserver'});
            //var newName = Game.spawns['Spawn1'].createCreep([MOVE, CLAIM], undefined, {role: 'reserver'});
            var newName = Game.spawns.Spawn1.createCustomClaimer(energy, 'reserver');
            console.log('Spawning new reserver: ' + newName + ' #' + reservers.length);
        }
        else{
            if(hostiles.length > 0){
                if(meleeFighters.length < 1){
                    var newName = Game.spawns['Spawn1'].createCreep([TOUGH, MOVE, MOVE, ATTACK, ATTACK, MOVE, MOVE, MOVE, ATTACK], undefined, {role: 'meleeFighter'});
                    console.log('Spawning new melee fighter: ' + newName + ' #' + meleeFighters.length);
                }
                else if(meleeFighters.length < 2){
                    var newName = Game.spawns['Spawn1'].createCreep([TOUGH, MOVE, MOVE, ATTACK, ATTACK, MOVE, MOVE, MOVE, ATTACK], undefined, {role: 'meleeFighter'});
                    console.log('Spawning new melee fighter: ' + newName + ' #' + meleeFighters.length);
                }
                else if(rangedDPS.length < 1){
                    var newName = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK], undefined, {role: 'rangedDPS'});
                    console.log('Spawning new ranged DPS: ' + newName + ' #' + rangedDPS.length);
                }
            }
        }
            // Fill in slot to stem overflow of energy
            /*else{
                var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, WORK, CARRY, WORK, CARRY, WORK, MOVE], undefined, {role: 'upgrader'});
                console.log('Spawning new upgrader: ' + newName + ' #' + upgraders.length);
            }*/
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer'){
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'wallRepairer'){
            roleWallRepairer.run(creep);
        }
        if(creep.memory.role == 'reserver'){
            roleReserver.run(creep);
        }
        if(creep.memory.role == 'ldHarvester'){
            if(hostiles.length > 0){
                roleHarvester.run(creep);
            }
            else{
                roleldHarvester.run(creep);
            }
        }
            
        if(creep.memory.role == 'meleeFighter'){
            roleMeleeFighter.run(creep);
        }
        if(creep.memory.role == 'rangedDPS'){
            roleRangedDPS.run(creep);
        }
        if(creep.memory.role == 'healer'){
            roleHealer.run(creep);
        }
        if(creep.memory.role == 'invader'){
            roleInvader.run(creep, invasionFlag);
        }
    }
    
    var towers = Game.rooms.W58N6.find(FIND_STRUCTURES, {
        filter: (structure) => {                
            return (structure.structureType == STRUCTURE_TOWER);
        }
    });
    
    if(towers.length > 0) {
        for(var i = 0; i < towers.length; i++){
            var closestHostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                towers[i].attack(closestHostile);
            }
            
            var closestDamagedStructure = towers[i].pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 500000
            });
            if(closestDamagedStructure && towers[i].energy > (towers[i].energyCapacity / 2)) {
                towers[i].repair(closestDamagedStructure);
            }
        }
    }
}