// console.log("hello");

import app from "./app.js";
import { Config } from "./config/index.js";

// console.log(Config.PORT);


const startServer = () => {
  const PORT = Config.PORT;

  try {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

// function welcome(name: string) {
//   console.log("hello");

//   const user = {
//     name: "rakesh",
//   };

//   const fname = user.name;

//   return name + fname;
// }

// welcome("adnan");
