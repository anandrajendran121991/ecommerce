import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['host.docker.internal:9092'],
});

export default kafka;
