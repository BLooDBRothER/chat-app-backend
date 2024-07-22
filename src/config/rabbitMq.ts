import amqplib, { credentials } from "amqplib";
import { error } from "console";

const RabbitMQ = () => {
    let _channel: amqplib.Channel ;

    const initConnection = async () => {
        if(_channel) {
            return;
        }

        if(!process.env.RABBITMQ_DEFAULT_USER || !process.env.RABBITMQ_DEFAULT_PASS) {
            throw error("No credential for rabbitmq")
        }

        const connection = await amqplib.connect("amqp://localhost", {
            credentials: credentials.plain(process.env.RABBITMQ_DEFAULT_USER, "admin"),
        });

        console.log(`[Info]: RabbitMQ | Connected...`);

        _channel = await connection.createChannel();
    }

    const sendMessage = async (queue: string, msg: object) => {
        await _channel.assertQueue(queue, {
            durable: true
        });

        _channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    }

    return { initConnection, sendMessage }
};

const rabbitMq = RabbitMQ();

export default rabbitMq;
