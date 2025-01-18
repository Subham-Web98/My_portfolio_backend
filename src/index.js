import { app, PORT } from "./app.js";
import { connectionDataBase } from "./db/indexDB.js";

connectionDataBase()
  .then(() => {
    app.listen(PORT, () => {
      try {
        console.log(`Serving on port ${PORT}`);
      } catch (error) {
        console.error(`Server connection error: ${error}`);
      }
    });
  })
  .catch((error) => `Database connection error: ${error}`);
