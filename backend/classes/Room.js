
const config = require("../config/config");
//Rooms are not Mediasopu things, MS care about mediastream, transport,
//things like that It doesn;t care, or know about rooms
//Rooms can be inside of clients, clients inside of rooms
//Transport can belong to rooms or client etc

class Room{
    constructor(roomName, workerToUse){
        this.roomName = roomName;
        this.worker = workerToUse;
        this.router = null;

        this.client = [];
        this.activeSpeakerList = [];
         
    }
    addClient(client){
        this.client.push(client);
    }
    async createRouter(){
        return new Promise(async (resolve,reject)=>{
            this.router = await this.worker.createRouter({
                mediaCodecs:config.routerCodeInfo
            })
            resolve();
        })
    }
}


module.exports = Room;