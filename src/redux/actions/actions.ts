import { createAction, createAsyncAction } from 'typesafe-actions'
import { Trade, Message, BPI } from "../../types/types";
import {
  SELECT_TRADE,
  GET_TRADES,
  GET_TRADES_SUCCESS,
  GET_TRADES_FAILURE,
  SEND_MESSAGE,
  DELETE_TRADE,
  SWITCH_USER,
  MARK_AS_READ,
  GET_TRADING_INFO,
  GET_TRADING_INFO_SUCCESS,
  GET_TRADING_INFO_FAILURE
} from "./actionTypes";

type TradeId = number
export const selectTrade = createAction(SELECT_TRADE) <TradeId | null> ();

export const {request: getTrades, success: getTradesSuccess} = //TODO: handle failure
  createAsyncAction(GET_TRADES, GET_TRADES_SUCCESS, GET_TRADES_FAILURE) <void, Trade[], Error> ();

export const deleteTrade = createAction(DELETE_TRADE) <TradeId> ();

export const switchUser = createAction(SWITCH_USER) <{isSeller: boolean}> ();

export const sendMessage = createAction(SEND_MESSAGE) <Message> ();

export const markAsRead = createAction(MARK_AS_READ) <TradeId> ();

export const {request: getTradingInfo, success: getTradingInfoSuccess, failure: getTradingInfoFailure} = //TODO: handle failure
  createAsyncAction(GET_TRADING_INFO, GET_TRADING_INFO_SUCCESS, GET_TRADING_INFO_FAILURE) <void, BPI, Error> ();
