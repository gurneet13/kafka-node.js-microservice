const { parentPort, threadId } = require('worker_threads');
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});
const topicName = 'orderCreated';
const consumerNumber = '1' //process.argv[2] || '1';

parentPort.on('message', async (task) => {
    try {
        console.log(`running task on thread: ${threadId}`)
        parentPort.postMessage(processConsumer())   
    } catch (error) {
        console.log("error while caling main func",error)
    }
})

const processConsumer  = async () => {
    const paymentsConsumer = kafka.consumer({groupId: 'payments'});
    await Promise.all([
        paymentsConsumer.connect(),
    ]);

    await Promise.all([
        await paymentsConsumer.subscribe({ topic: topicName }),
    ]);

    let paymentCounter = 1;

    await paymentsConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            logMessage(paymentCounter, `paymentsConsumer#${consumerNumber}`, topic, partition, message);
            paymentCounter++;
        },
    });

};

const logMessage = (counter, consumerName, topic, partition, message) => {
    console.log(`received a new message number: on worker ${threadId}: ${counter} on ${consumerName}: `, {
        topic,
        partition,
        message: {
            offset: message.offset,
            headers: message.headers,
            value: message.value.toString()
        },
    });
};

