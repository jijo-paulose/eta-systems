import { init } from "@rematch/core";
import * as models from "./models";
import {createBrowserHistory} from "history";
import { routerMiddleware } from "react-router-redux";

const history = createBrowserHistory();

history.listen((location, action) => {
    window.scrollTo(0, 0);
});

const routeMiddleware = routerMiddleware(history);

const middlewares = [routeMiddleware];

const store = init({
    redux: {
        devtoolOptions: {
            disabled: true,
        },
        middlewares: middlewares
    },
    models
});

export { store, history };



