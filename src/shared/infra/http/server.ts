import { app } from "./app";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  if(!process.env.SECRET_JWT) {
    console.error(`A variável SECRET_JWT é obrigatória para realização de login no sistema.`)
  }
  const running = {
    author: "Clebson Santos",
    system: "Altas - softmanager api",
    node_version: 16,
    port: PORT,
    message: "Server is running",
  };
  console.table([running]);
});
