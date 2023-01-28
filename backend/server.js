const result = require('dotenv').config();

if (result.error) {
    throw result.error
}

console.log(result.parsed)

const express = require('express');
const webPush = require('web-push');
const SubscritionModel = require('./subscriptionSchema');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const port = 9000;
const DatabaseName = 'pushDb';
const DatabaseURI = `mongodb://localhost:27017/${DatabaseName}`;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.post('/subscribe', async (req, res, next) => {
    console.log('subscribe invoked');
    const newSubscription = await SubscritionModel.create({...req.body});
    const  options = {
        vapidDetails: {
            subject: 'mailto:janmarkirsten91@outlook.de',
            publicKey: process.env.PUBLIC_KEY,
            privateKey: process.env.PRIVATE_KEY,
        },
    };
    try {
        const res2 = await webPush.sendNotification(
            newSubscription,
            JSON.stringify({
                title: 'Hello from server',
                description: 'this message is coming from the server',
                image: 'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg',
            }),
            options
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

mongoose
    .connect(DatabaseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(db => {
        app.listen(port, () => console.log(`app running on ${port}`));
    })
    .catch(err => console.log(err.message));