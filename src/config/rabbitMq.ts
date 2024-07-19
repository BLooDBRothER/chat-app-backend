import amqplib, { credentials } from "amqplib";

const RabbitMQ = async () => {
    const conn = await amqplib.connect("amqp://localhost", {
        credentials: credentials.plain("admin", "admin"),
    });
    const channel = await conn.createChannel();

    var queue = "task_queue";
    var msg = "Hello World!";

    // This makes sure the queue is declared before attempting to consume from it
    channel.assertQueue(queue, {
        durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
    });

    console.log(" [x] Sent '%s'", msg);
};

export default RabbitMQ;
