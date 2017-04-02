module.exports = function() {
    StructureSpawn.prototype.createCustomCreep = 
        function(energy, roleName) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            var sourceIndex;
            for(let i = 0; i < numberOfParts; i++){
                body.push(WORK);
            }
            for(let i = 0; i < numberOfParts; i++){
                body.push(CARRY);
            }
            for(let i = 0; i < numberOfParts; i++){
                body.push(MOVE);
            }
            
            if(sourceIndex != 0){
                sourceIndex = 1;
            }
            else{
                sourceIndex = 0;
            }
            
            return this.createCreep(body, undefined, {role: roleName, working: false, index: sourceIndex});
        };
        
    StructureSpawn.prototype.createCustomClaimer =
        function(energy, roleName) {
            var numberOfParts = Math.floor(energy / 650);
            var body = [];
            for(let i = 0; i < numberOfParts; i++){
                body.push(CLAIM);
            }
            for(let i = 0; i < numberOfParts; i++){
                body.push(MOVE);
            }
            
            return this.createCreep(body, undefined, {role: roleName});
        };
};