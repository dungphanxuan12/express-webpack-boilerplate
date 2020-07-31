import mongoose from "mongoose";

export default () => {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DB_NAME,
    MONGO_OPTIONS,
  } = process.env;

  const MONGO_CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?${MONGO_OPTIONS}`;

  mongoose.Promise = global.Promise;
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log("Error", err);
      process.exit();
    });
};
