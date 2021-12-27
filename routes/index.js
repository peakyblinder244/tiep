//model

import userRoute from "./user";
import movieRoute from "./movie";

export default function route(app) {
  app.use("/", userRoute);
  app.use("/movie", movieRoute);
}
