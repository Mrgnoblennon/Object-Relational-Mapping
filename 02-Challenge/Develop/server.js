const express = require('express');
const routes = require('./routes');
// import sequlize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  // seed the database

    // start the server
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  });


