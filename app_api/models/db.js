const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1'
let dbURI = `mongodb://${host}/hb`;
const readLine = require('readline');

if (process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGODB_URI;
}

const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}), 1000);
}

mongoose.connection.on('connected', () => {
  console.log('connected');
});

mongoose.connection.on('error', err => {
  console.log(`error: ' + ${err}`);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

if(process.platform ==='win32'){
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', ()=>{
        process.emit("SIGINT");
    });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

connect();


require('./projects');
require('./users');
