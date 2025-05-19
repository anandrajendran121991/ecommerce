import kafka from './Kafka';

export const kafkaProducer = kafka.producer();

export const startProducer = async () => {
  await kafkaProducer.connect();
};
