import app from "./app.js";
import { sequelize } from './database/database.js';

async function main() {
  try {
    await sequelize.sync({force: false});
    app.listen(app.get("port"));
    console.log("Server on port", app.get('port'));
  } catch (error) {
    console.error("Error conection db: ", error)
  }
}

main();