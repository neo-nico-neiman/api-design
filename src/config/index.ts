import merge from "lodash.merge";
import * as dotenv from "dotenv";

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || "development";

let envConfig;

if (process.env.NODE_ENV === "production") {
	envConfig = require("./production").default;
} else if (process.env.NODE_ENV === "staging") {
	envConfig = require("./staging").default;
} else {
	envConfig = require("./local").default;
}
export default merge(
	{
		env: process.env.NODE_ENV,
		secrets: {
			jwt: process.env.JWT_SECRET,
			dbUrl: process.env.DATABASE_URL,
		},
	},
	envConfig
);
