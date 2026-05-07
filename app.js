const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // HTML ဖိုင်တွေထားမယ့် နေရာ

// ⚠️ ဒီနေရာမှာ မင်းရဲ့ Ubuntu IP နဲ့ ပြင်ပေးရမယ်
const url = 'mongodb://admin:password@mongodb:27017';
const client = new MongoClient(url);
const dbName = 'user-account';

async function main() {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection('users');

    // ၁။ Data အဟောင်းကို ပြန်ယူမယ် (Read)
    app.get('/get-profile', async (req, res) => {
        const user = await collection.findOne({ id: 1 });
        res.send(user || {});
    });

    // ၂။ Data အသစ်ကို Save လုပ်မယ် (Update/Create)
    app.post('/update-profile', async (req, res) => {
        const payload = req.body;
        await collection.updateOne({ id: 1 }, { $set: payload }, { upsert: true });
        res.send({ message: "Profile updated successfully!" });
    });

    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}

main().catch(console.error);