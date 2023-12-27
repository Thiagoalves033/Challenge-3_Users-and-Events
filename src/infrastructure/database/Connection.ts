import mongoose from 'mongoose';

export default class Connection {
  connection: any;

  constructor() {
    this.connection = mongoose.connect(process.env.MONGO_URI as string);
  }
}
