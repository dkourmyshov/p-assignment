import { combineEpics } from "redux-observable";
import { from } from "rxjs";
import { filter, map, mergeMap, delay } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { TradeEpic, isCoindeskResponse } from "../../types/types"; 
import { Trades } from "../../mocks/data";

import { getTrades, getTradesSuccess, getTradingInfo, getTradingInfoSuccess, getTradingInfoFailure } from '../actions/actions';

const COINDESK_API = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";

const getTradesEpic: TradeEpic = action$ => action$.pipe(
  filter(isActionOf(getTrades)),
  mergeMap(() => api().then(trades => getTradesSuccess(trades)))
)

const fetchTradingInfoEpic: TradeEpic = action$ => action$.pipe(
  filter(isActionOf(getTradingInfo)),
  mergeMap(() => from(fetch(COINDESK_API)).pipe(
    mergeMap(response => response.json()),
    delay(1000),
    map(data => isCoindeskResponse(data)
      ? getTradingInfoSuccess(data.bpi)
      : getTradingInfoFailure(new Error("Coindesk server returned non-conforming response")))
  ))
)

function api() {
  return Promise.resolve(Trades);
}

export const tradeEpic = combineEpics(getTradesEpic, fetchTradingInfoEpic);
