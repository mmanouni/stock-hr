const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize({
  // ...existing code for database connection...
});

const umzug = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

(async () => {
  try {
    await umzug.up();
    console.log('All migrations applied successfully.');
  } catch (error) {
    console.error('Failed to apply migrations:', error);
  } finally {
    await sequelize.close();
  }
})();
