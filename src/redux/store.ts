import { createStore, combineReducers, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

import { tradeReducer } from "./reducers/tradeReducer";
import { tradeEpic } from "./middleware/tradeEpic";
import { TradeActionTypes } from '../types/types'

const rootReducer = combineReducers({
  trades: tradeReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const epicMiddleware = createEpicMiddleware<TradeActionTypes, TradeActionTypes, AppState>();

export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(tradeEpic);
