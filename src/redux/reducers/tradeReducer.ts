import produce from "immer";
import { getType } from "typesafe-actions";

import { TradesState, TradeActionTypes } from "../../types/types";
import * as actions from "../actions/actions";
import { getIdx } from "../../helpers/getIdx";

const initialState: TradesState = {
  trades: [],
  selected: null,
  isSeller: true,
  tradingInfo: {
    isLoaded: false,
    isFetching: false,
    bpi: null,
  },
};

export const tradeReducer = (state = initialState, action: TradeActionTypes) =>
  produce(state, (draft) => {
    let tradeIdx;
    switch (action.type) {
      case getType(actions.selectTrade):
        tradeIdx = getIdx("id", action.payload, draft.trades) || 0;
        draft.selected = action.payload;
        break;
      case getType(actions.getTradesSuccess):
        draft.trades = action.payload;
        break;
      case getType(actions.deleteTrade):
        tradeIdx = getIdx("id", action.payload, draft.trades) || 0;
        draft.trades.splice(tradeIdx, 1);
        draft.selected = null;
        break;
      case getType(actions.switchUser):
        draft.isSeller = action.payload.isSeller;
        draft.selected = null;
        break;
      case getType(actions.sendMessage):
        tradeIdx = getIdx("id", state.selected, draft.trades) || 0;
        action.payload.income
          ? (draft.trades[tradeIdx].chat.gotUnreads.seller = true)
          : (draft.trades[tradeIdx].chat.gotUnreads.buyer = true);
        draft.trades[tradeIdx].chat.messages.push(action.payload);
        break;
      case getType(actions.markAsRead):
        tradeIdx = getIdx("id", action.payload, draft.trades) || 0;
        draft.isSeller
          ? (draft.trades[tradeIdx].chat.gotUnreads.seller = false)
          : (draft.trades[tradeIdx].chat.gotUnreads.buyer = false);
        break;
      case getType(actions.getTradingInfoSuccess):
        draft.tradingInfo.bpi = action.payload;
        break;
    }
  });
