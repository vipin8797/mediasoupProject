
//Requiring Dependencies
const os = require("os"); //to get cpu info 
const mediasoup = require("mediasoup");
const config = require("../config/config");

//Using Dependencies
const threadsCount =   os.cpus().length;

console.log("thread: ",threadsCount);



const createWorkers = async () => {
  const workers =[];
    for(let i=0; i<threadsCount; i++){

        //Creatin worker one by one
       const worker = await mediasoup.createWorker({
    rtcMinPort: config.workerSettings.rtcMinPort,
    rtcMaxPort: config.workerSettings.rtcMaxPort,
    logLevel: config.workerSettings.logLevel,
    logTags: config.workerSettings.logTags,
});


        //event to handle if worker died
       worker.on('died',()=>{
        console.log("worker died");
        process.exit(1);
       })
      
       //storing worker in workers arrr
       workers.push(worker);

    }


    return workers;//sending workers arr after all workers created.

}
module.exports = createWorkers;
