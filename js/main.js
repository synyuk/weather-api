import weatherView from "./view.js";
import weatherModel from "./model.js"
import weatherController from "./controller.js";
import {key} from "./config.js";

const model = new weatherModel(key);
const view = new weatherView(model);
const weather = new weatherController(model, view);