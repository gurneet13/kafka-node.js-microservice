const WorkerPool = require('./WorkerPool')
const path = require('path');
const os = require('os')

try {
    console.log("max cpu threads found",os.cpus().length);
    const pool2 = new WorkerPool(os.cpus().length, path.resolve(__dirname, 'kafkajs-consumer2.js'));
    pool2.runTask({}, (err, result) => {
        if (err) {
            console.log("error",err)
        }
    })  
    pool2.runTask({}, (err, result) => {
        if (err) {
            console.log("error",err)
        }
    })  
} catch (error) {
    console.log("Something went wrong",error)
}
