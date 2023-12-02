import app from "./api/server";
import config from "./config";

process.on("uncaughtException", (e) => {
	//TODO  add tracing and logs
	console.log(12, e);
});

process.on("unhandledRejection", (e) => {
	//TODO  add tracing and logs
	console.log(12, e);
});

app.listen(config.port, () => {
	console.log(`Server listening at port ${config.port}`);
});
