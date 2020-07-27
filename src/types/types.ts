import { Epic } from "redux-observable";
import { ActionType } from "typesafe-actions";
import { AppState } from "../redux/store"
import * as actions from "../redux/actions/actions";
export type TradeActionTypes = ActionType<typeof actions>
export type TradeEpic = Epic<TradeActionTypes, TradeActionTypes, AppState>

export interface BPI {
  USD: {
    code: string;
    rate: string;
    description: string;
    rate_float: number;
  };
}

export interface TradingInfo {
  isLoaded: boolean;
  isFetching: boolean;
  bpi: BPI | null;
}

interface CoindeskResponse {
  bpi: BPI
  // coindesk response also have other fields, but we do not care about them for now
}

// poor man's typescript-is
export const isCoindeskResponse = (coindeskResponse: any): coindeskResponse is CoindeskResponse =>
  'bpi' in coindeskResponse && typeof coindeskResponse.bpi === 'object' &&
  'USD' in coindeskResponse.bpi && typeof coindeskResponse.bpi.USD === 'object' &&
  'code' in coindeskResponse.bpi.USD && typeof coindeskResponse.bpi.USD.code === 'string' &&
  'rate' in coindeskResponse.bpi.USD && typeof coindeskResponse.bpi.USD.rate === 'string' &&
  'description' in coindeskResponse.bpi.USD && typeof coindeskResponse.bpi.USD.description === 'string' &&
  'rate_float' in coindeskResponse.bpi.USD && typeof coindeskResponse.bpi.USD.rate_float === 'number';

export interface Message {
  income: boolean;
  text: string;
  time: Date;
}

export interface Trade {
  id: number;
  buyerName: string;
  paymentMethod: string;
  amount: string;
  isPaid: boolean;
  chat: {
    messages: Message[];
    gotUnreads: {
      buyer: boolean;
      seller: boolean;
    };
  };
}

export interface TradesState {
  trades: Trade[];
  selected: number | null;
  selectedCandidate: number | null;
  isSeller: boolean;
  tradingInfo: TradingInfo;
}
