var roleReserver = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room != Game.rooms.W58N7){
            creep.moveTo(Game.flags.Claim1);
        }
        else{
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleReserver;