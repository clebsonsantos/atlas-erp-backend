import { app } from "./app";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  const running = {
    author: "Clebson Santos",
    system: "Altas - softmanager api",
    node_version: 16,
    port: PORT,
    message: "Server is running",
  };
  console.table([running]);
});
