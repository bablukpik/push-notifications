require('dotenv').config()
const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

app.use(cors());
app.use(express.json());

const router = express.Router();
const PORT = process.env.PORT ?? 8000;

// application server key using web-push
const vapidKeys = {
    publicKey: "BANBteLufa0tEzsgxpyMFOamDP_n093GRE-AvxktVkv0HzL_Sqi1k4lkOt6ByataMePCkk41ZdbClCFskLY55KE",
    privateKey: "9Lufq8iZtfxCMbfxDuVXhm9XobwNOYqv_l8FMCQM2gs",
}

webpush.setVapidDetails(
    'mailto:bablukpik@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const inMemoryDB = [];

router.post("/save-subscription", (req, res) => {
    const subscriptionData = req.body;

    console.log(subscriptionData)

    if (!subscriptionData || !subscriptionData.endpoint || !subscriptionData.keys) {
        return res.status(400).json({
            success: false,
            message: "Invalid subscription data",
        });
    }

    // Save to DB
    inMemoryDB.push(subscriptionData);

    res.status(201).json({
        success: true,
        data: subscriptionData,
        message: "Subscription saved!",
    });
});

router.get("/send-notification", async (_, res) => {
    const notificationMessage = {
        title: "New Update Available!",
        body: "Check out the latest features and improvements.",
        icon: "path/to/icon.png",
    };

    try {
        await webpush.sendNotification(inMemoryDB[0], JSON.stringify(notificationMessage));
        res.status(200).json({
            success: true,
            message: "Notification sent to the Push Service!",
        });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({
            success: false,
            message: error.toString(),
        });
    }
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}!`);
});
