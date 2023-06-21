const express = require('express');
const routes = require('./routes');
// import sequlize connection
const sequelize = require('./config/connection');
// import seeds
const seedAll = require('./seeds');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  // seed the database
  seedAll().then(() => {
    // start the server
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  });
});

