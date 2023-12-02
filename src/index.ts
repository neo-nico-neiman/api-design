import app from "./api/server";
import config from "./config";

process.on("uncaughtException", (e) => {
	console.log(e); //TODO  add tracing and logs
});

process.on("unhandledRejection", (e) => {
	console.log(e); //TODO  add tracing and logs
});

app.listen(config.port, () => {
	console.log(`Server listening at port ${config.port}`);
});
