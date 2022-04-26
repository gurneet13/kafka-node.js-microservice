# Kafka with node microservices in muti-thread pool

Consume events from kafka with multiple consumer groups with pub/sub  type architecture. These node consumers run as micro-services in muti-thread pool which consume events from each partition of kafka.

## How exactly does it run

- We have a single kafka broker that we run(you can add more, just change the docker compose file and run docker-compose up)
- We first run the kafkajs-admin.js 
  ```bashorder
  node kafkajs-admin.js
  ```
  to create a topic called "orderCreated" which will have 2 partitions. Note! if you 
  use multiple brokers don't forget to add it to the brokers array in the kafkajs-admin.js.

  ```javascript
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
  });
  ```

- Next we run the kafkajs-producer.js to produce events
  ```bashorder
  node kafkajs-producer.js
  ```
  Note! you can alter the number of events produced in the file and also mention a specific partition if required.

- Now the fun part, we have two consumerIndex files, consumerIndex1 .js & consumerIndex2.js, this is done to mimic two node micro services 
   ```bashorder
  node consumerIndex1.js
  ```
   ```bashorder
  node consumerIndex2.js
  ```

- Each consumer runs on multiple threads, so when you run both consumers & once kafka re-balances you will see the events being consumed that you produced in the console. Note! each thread on the consumer will only get events from one partition.

- so in our case we have 1 topic (T1) & 2 partition (P1 & P2) with 2 consumer groups (CG1 & CG2) running on 2 threads each. If we produce 10 messages, then both CG1 & CG2 will receive 10 messages (pub/sub) but messages on partition 1 will be consumed by one thread and partition 2 by the second thread respectively for each CG

## Installation & requirements
- node v14 and above required for worker threads to work
- run the docker-compose file to install your kafka and apache zookeeper setup
- npm i


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)