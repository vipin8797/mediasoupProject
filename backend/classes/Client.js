class Client{
    constructor(userName,socket){
     this.userName = userName;
     this.socket = socket;

     this.upstreamTransport = null;
     //we will have an audio and video consumer
     this.producer = {};

     this.downstreamTransport = [];
     this.consumer = [];
     this.room = null

    }
}

module.exports = Client;