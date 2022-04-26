const WorkerPool = require('./WorkerPool')
const path = require('path');
const os = require('os')

try {
    console.log("max cpu threads found",os.cpus().length);
    const pool1 = new WorkerPool(os.cpus().length, path.resolve(__dirname, 'kafkajs-consumer.js'));
    pool1.runTask({}, (err, result) => {
        if (err) {
            console.log("error",err)
        }
    }) 
    pool1.runTask({}, (err, result) => {
        if (err) {
            console.log("error",err)
        }
    })  
} catch (error) {
    console.log("Something went wrong",error)
}
