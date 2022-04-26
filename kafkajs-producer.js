
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const topicName = 'orderCreated';

const processProducer  = async () => {
    const producer = kafka.producer();
    await producer.connect();
    for (let i = 0; i < 10; i++) {
        await producer.send({
            topic: topicName,
            messages: [
                { 
                    //partition:1,
                    value: JSON.stringify({customerId: i, orderId: i})
                 },
            ],
        });
    }
};

processProducer().then(() => {
    console.log('done');
    process.exit();
});