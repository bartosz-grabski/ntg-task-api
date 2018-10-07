import mongoose from 'mongoose';

export default ({
  uri, host, port, db, user, pass,
}) => {
  if (uri) {
    mongoose.connect(uri);
    return;
  }

  if (user) {
    mongoose.connect(`mongodb://${user}:${pass}@${host}:${port}/${db}`, { useNewUrlParser: true });
    return;
  }

  mongoose.connect(`mongodb://${host}:${port}/${db}`, { useNewUrlParser: true });
};
