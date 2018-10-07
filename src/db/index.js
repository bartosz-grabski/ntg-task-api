import mongoose from 'mongoose';

export default ({host,port,db,user,pass}) => {
    if (user) {
        mongoose.connect(`mongodb://${user}:${pass}@${host}:${port}/${db}`, { useNewUrlParser: true });
    } else {
        mongoose.connect(`mongodb://${host}:${port}/${db}`, { useNewUrlParser: true });
    }
}