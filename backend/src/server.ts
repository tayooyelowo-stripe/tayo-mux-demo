import app from './app';
import { config } from './config/config';
import mongoose from "mongoose";

const main = async () => {
    // Startup mongo
    await mongoose.connect(config.mongodbUri);

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

main().catch(err => console.log({ err }));
