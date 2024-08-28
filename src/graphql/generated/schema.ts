import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED'
}

export type AuthInput = {
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  error?: Maybe<ErrorType>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export enum BetEnumType {
  Open = 'OPEN',
  Settle = 'SETTLE'
}

export type BetInputType = {
  back?: InputMaybe<Scalars['Int']['input']>;
  betType: Scalars['String']['input'];
  bettingType: Scalars['String']['input'];
  eventId: Scalars['String']['input'];
  eventName: Scalars['String']['input'];
  exposure: Scalars['Int']['input'];
  lay?: InputMaybe<Scalars['Int']['input']>;
  loss: Scalars['Float']['input'];
  marketId: Scalars['String']['input'];
  odds: Scalars['Float']['input'];
  profit: Scalars['Int']['input'];
  run?: InputMaybe<Scalars['Int']['input']>;
  runnerName: Scalars['String']['input'];
  selectionId: Scalars['String']['input'];
  sportId: Scalars['Int']['input'];
  stableOdds: Scalars['Float']['input'];
  stake: Scalars['Int']['input'];
};

export type BetPayload = {
  __typename?: 'BetPayload';
  bet?: Maybe<BetType>;
  error?: Maybe<ErrorType>;
};

export type BetType = {
  __typename?: 'BetType';
  _id: Scalars['String']['output'];
  betType: Scalars['String']['output'];
  bettingType?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eventId: Scalars['String']['output'];
  eventName: Scalars['String']['output'];
  ip: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  loss: Scalars['Int']['output'];
  marketId: Scalars['String']['output'];
  odds: Scalars['Float']['output'];
  profit: Scalars['Int']['output'];
  run?: Maybe<Scalars['Int']['output']>;
  runnerName: Scalars['String']['output'];
  selectionId: Scalars['String']['output'];
  settled?: Maybe<Scalars['Boolean']['output']>;
  sportId?: Maybe<Scalars['Int']['output']>;
  stake: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
  win?: Maybe<Scalars['Boolean']['output']>;
};

export type BookmakerMarketRunners = {
  __typename?: 'BookmakerMarketRunners';
  back?: Maybe<Array<Maybe<PriceSize>>>;
  ballRunning?: Maybe<Scalars['Boolean']['output']>;
  eventStatus?: Maybe<Scalars['String']['output']>;
  lay?: Maybe<Array<Maybe<PriceSize>>>;
  marketStatus?: Maybe<Scalars['String']['output']>;
  runnerName?: Maybe<Scalars['String']['output']>;
  selectionId: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type BookmakerMarketType = {
  __typename?: 'BookmakerMarketType';
  bettingType?: Maybe<Scalars['String']['output']>;
  marketId: Scalars['String']['output'];
  marketName: Scalars['String']['output'];
  runners?: Maybe<Array<Maybe<BookmakerMarketRunners>>>;
};

export type CasinoGameInitType = {
  __typename?: 'CasinoGameInitType';
  url: Scalars['String']['output'];
};

export type CasinoGamesInitInputType = {
  currency: Scalars['String']['input'];
  game_uuid: Scalars['String']['input'];
  player_id: Scalars['String']['input'];
  player_name: Scalars['String']['input'];
};

export type CasinoGamesType = {
  __typename?: 'CasinoGamesType';
  freespin_valid_until_full_day: Scalars['Int']['output'];
  has_freespins: Scalars['Int']['output'];
  has_lobby: Scalars['Int']['output'];
  has_tables: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  is_mobile: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  technology: Scalars['String']['output'];
  type: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Event = {
  __typename?: 'Event';
  betDelay: Scalars['Int']['output'];
  competitionId: Scalars['Int']['output'];
  competitionName: Scalars['String']['output'];
  eventId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  market?: Maybe<Array<Maybe<MarketType>>>;
  maxLimit: Scalars['Int']['output'];
  maxOdd: Scalars['Float']['output'];
  minLimit: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  openDate: Scalars['DateTime']['output'];
  selected: Scalars['Boolean']['output'];
  sportId: Scalars['Int']['output'];
};

export type EventAdminPayload = {
  __typename?: 'EventADMINPayload';
  error?: Maybe<ErrorType>;
  event?: Maybe<EventAdmin>;
};

export type EventAdmin = {
  __typename?: 'EventAdmin';
  _id?: Maybe<Scalars['String']['output']>;
  competitionId?: Maybe<Scalars['Int']['output']>;
  competitionName?: Maybe<Scalars['String']['output']>;
  eventId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  selected?: Maybe<Scalars['Boolean']['output']>;
  sportId?: Maybe<Scalars['Int']['output']>;
};

export type EventAdminInput = {
  competitionId?: InputMaybe<Scalars['Int']['input']>;
  competitionName?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  openDate?: InputMaybe<Scalars['String']['input']>;
  sportId?: InputMaybe<Scalars['Int']['input']>;
};

export type EventListsType = {
  __typename?: 'EventListsType';
  cricket?: Maybe<Array<Maybe<Event>>>;
  football?: Maybe<Array<Maybe<Event>>>;
  tennis?: Maybe<Array<Maybe<Event>>>;
};

export type EventMarketType = {
  __typename?: 'EventMarketType';
  bettingType?: Maybe<Scalars['String']['output']>;
  marketId: Scalars['String']['output'];
  marketName: Scalars['String']['output'];
  marketTime?: Maybe<Scalars['String']['output']>;
  marketType?: Maybe<Scalars['String']['output']>;
  runners?: Maybe<Array<Maybe<MarketRunners>>>;
};

export type EventPayload = {
  __typename?: 'EventPayload';
  error?: Maybe<ErrorType>;
  event?: Maybe<Event>;
};

export type EventPl = {
  __typename?: 'EventPl';
  date?: Maybe<Scalars['String']['output']>;
  eventId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pl?: Maybe<Scalars['Int']['output']>;
  sport?: Maybe<Scalars['Int']['output']>;
};

export type EventUpdateInput = {
  betDelay?: InputMaybe<Scalars['Int']['input']>;
  eventId?: InputMaybe<Scalars['Int']['input']>;
  maxLimit?: InputMaybe<Scalars['Int']['input']>;
  maxOdd?: InputMaybe<Scalars['Float']['input']>;
  minLimit?: InputMaybe<Scalars['Int']['input']>;
};

export type FancyMarket = {
  __typename?: 'FancyMarket';
  _id: Scalars['String']['output'];
  marketId: Scalars['String']['output'];
};

export type FancyMarketInput = {
  eventId: Scalars['String']['input'];
  marketId: Array<Scalars['String']['input']>;
};

export type FancyMarketNew = {
  __typename?: 'FancyMarketNEW';
  back?: Maybe<PriceSize>;
  bettingType?: Maybe<Scalars['String']['output']>;
  lay?: Maybe<PriceSize>;
  marketId?: Maybe<Scalars['String']['output']>;
  marketType?: Maybe<Scalars['String']['output']>;
  runnerName?: Maybe<Scalars['String']['output']>;
  selectionId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type FancyPl = {
  __typename?: 'FancyPl';
  exposure?: Maybe<Scalars['Int']['output']>;
  runs?: Maybe<Array<Maybe<RunsList>>>;
};

export type MarketInput = {
  eventId: Scalars['Int']['input'];
  marketId: Scalars['String']['input'];
};

export type MarketRunners = {
  __typename?: 'MarketRunners';
  back?: Maybe<Array<Maybe<PriceSize>>>;
  ballRunning?: Maybe<Scalars['Boolean']['output']>;
  eventStatus: Scalars['String']['output'];
  lay?: Maybe<Array<Maybe<PriceSize>>>;
  marketStatus?: Maybe<Scalars['String']['output']>;
  runnerName?: Maybe<Scalars['String']['output']>;
  selectionId: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type MarketType = {
  __typename?: 'MarketType';
  bettingType?: Maybe<Scalars['String']['output']>;
  marketId: Scalars['String']['output'];
  marketName: Scalars['String']['output'];
  marketTime?: Maybe<Scalars['String']['output']>;
  marketType?: Maybe<Scalars['String']['output']>;
  runners?: Maybe<Array<Maybe<MarketRunners>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEvents?: Maybe<EventAdminPayload>;
  autAdminLogin?: Maybe<AuthPayload>;
  authLogin?: Maybe<AuthPayload>;
  authMaster?: Maybe<AuthPayload>;
  changePassword?: Maybe<AuthPayload>;
  createPL?: Maybe<PlType>;
  deleteBet?: Maybe<Scalars['String']['output']>;
  deleteEvents?: Maybe<Scalars['String']['output']>;
  plUpdate?: Maybe<PlType>;
  placeBet?: Maybe<BetPayload>;
  raceAddEvents?: Maybe<RaceEventAdminPayload>;
  registerUser?: Maybe<AuthPayload>;
  saveFancyMarket: Array<Maybe<FancyMarket>>;
  updateEvents?: Maybe<EventPayload>;
  updateUser?: Maybe<AuthPayload>;
};


export type MutationAddEventsArgs = {
  input?: InputMaybe<EventAdminInput>;
};


export type MutationAutAdminLoginArgs = {
  input?: InputMaybe<AuthInput>;
};


export type MutationAuthLoginArgs = {
  input?: InputMaybe<AuthInput>;
};


export type MutationAuthMasterArgs = {
  input?: InputMaybe<AuthInput>;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreatePlArgs = {
  input: PlInputType;
};


export type MutationDeleteBetArgs = {
  betId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteEventsArgs = {
  input?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationPlUpdateArgs = {
  input: PlInputType;
};


export type MutationPlaceBetArgs = {
  input?: InputMaybe<BetInputType>;
};


export type MutationRaceAddEventsArgs = {
  input?: InputMaybe<RaceEventInput>;
};


export type MutationRegisterUserArgs = {
  input?: InputMaybe<SignUpInput>;
};


export type MutationSaveFancyMarketArgs = {
  input?: InputMaybe<FancyMarketInput>;
};


export type MutationUpdateEventsArgs = {
  input?: InputMaybe<EventUpdateInput>;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUserInput>;
};

export type PlInputType = {
  exposure?: InputMaybe<Scalars['Int']['input']>;
  marketId: Scalars['String']['input'];
  pl: Array<InputMaybe<PlInsideInputType>>;
};

export type PlInsideType = {
  __typename?: 'PLInsideType';
  price?: Maybe<Scalars['Int']['output']>;
  selectionId?: Maybe<Scalars['String']['output']>;
};

export type PlType = {
  __typename?: 'PLType';
  _id?: Maybe<Scalars['String']['output']>;
  marketId?: Maybe<Scalars['String']['output']>;
  pl?: Maybe<Array<Maybe<PlInsideType>>>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ParentUser = {
  __typename?: 'ParentUser';
  _id: Scalars['ID']['output'];
  userName: Scalars['String']['output'];
};

export type PriceSize = {
  __typename?: 'PriceSize';
  line?: Maybe<Scalars['Float']['output']>;
  price: Scalars['Float']['output'];
  size: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  allOpenBets?: Maybe<Array<Maybe<BetType>>>;
  casinoGameInit?: Maybe<CasinoGameInitType>;
  casinoGamesList?: Maybe<Array<Maybe<CasinoGamesType>>>;
  getAdmins?: Maybe<UsersPayload>;
  getBetSettleInfo?: Maybe<Scalars['String']['output']>;
  getBookmakerList: Array<Maybe<BookmakerMarketType>>;
  getEvent?: Maybe<Event>;
  getEventBets: Array<Maybe<BetType>>;
  getEventMarket: Array<Maybe<EventMarketType>>;
  getEventMarketOdds: Array<Maybe<MarketType>>;
  getEventPL?: Maybe<Array<Maybe<EventPl>>>;
  getEventsBySearch?: Maybe<Array<Maybe<Event>>>;
  getEventsBySport?: Maybe<Array<Maybe<Event>>>;
  getFancy?: Maybe<Array<Maybe<FancyMarketNew>>>;
  getFancyMarket: Array<Maybe<FancyMarket>>;
  getFancyPl?: Maybe<FancyPl>;
  getMarketData?: Maybe<RaceMarketType>;
  getMarketPl?: Maybe<PlType>;
  getRace?: Maybe<RaceEvent>;
  getRaceMarket?: Maybe<EventMarketType>;
  getRaceSportsEvent?: Maybe<Array<Maybe<RaceEventAdmin>>>;
  getRaces?: Maybe<Array<Maybe<RaceEvent>>>;
  getSettleInfo?: Maybe<Scalars['String']['output']>;
  getSportEvents?: Maybe<SportsEvent>;
  getUser?: Maybe<AuthPayload>;
  getUsers?: Maybe<UsersPayload>;
  inPlay?: Maybe<EventListsType>;
  me?: Maybe<User>;
  openBets?: Maybe<Array<Maybe<BetType>>>;
  unMatchedBets?: Maybe<Array<Maybe<BetType>>>;
};


export type QueryAllOpenBetsArgs = {
  input?: InputMaybe<BetEnumType>;
};


export type QueryCasinoGameInitArgs = {
  input?: InputMaybe<CasinoGamesInitInputType>;
};


export type QueryGetAdminsArgs = {
  role?: InputMaybe<UserRole>;
};


export type QueryGetBookmakerListArgs = {
  input: Scalars['Int']['input'];
};


export type QueryGetEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type QueryGetEventBetsArgs = {
  eventId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetEventMarketArgs = {
  input: Scalars['Int']['input'];
};


export type QueryGetEventMarketOddsArgs = {
  input: Scalars['Int']['input'];
};


export type QueryGetEventsBySearchArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetEventsBySportArgs = {
  input: Scalars['Int']['input'];
};


export type QueryGetFancyArgs = {
  input: Scalars['Int']['input'];
};


export type QueryGetFancyMarketArgs = {
  eventId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFancyPlArgs = {
  marketId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMarketDataArgs = {
  input?: InputMaybe<MarketInput>;
};


export type QueryGetMarketPlArgs = {
  marketId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetRaceArgs = {
  input: Scalars['ID']['input'];
};


export type QueryGetRaceMarketArgs = {
  input: Scalars['String']['input'];
};


export type QueryGetRaceSportsEventArgs = {
  input: Scalars['Int']['input'];
};


export type QueryGetRacesArgs = {
  input: Scalars['Int']['input'];
};


export type QueryGetSportEventsArgs = {
  input: Scalars['Int']['input'];
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetUsersArgs = {
  input?: InputMaybe<UsersInput>;
};


export type QueryOpenBetsArgs = {
  input?: InputMaybe<BetEnumType>;
};

export type RaceEvent = {
  __typename?: 'RaceEvent';
  betDelay: Scalars['Int']['output'];
  bettingType: Scalars['String']['output'];
  event?: Maybe<Array<Maybe<RaceEventChild>>>;
  eventId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  maxLimit: Scalars['Int']['output'];
  maxOdd: Scalars['Float']['output'];
  minLimit: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  openDate: Scalars['String']['output'];
  selected: Scalars['Boolean']['output'];
  sportId: Scalars['Int']['output'];
};

export type RaceEventAdminPayload = {
  __typename?: 'RaceEventADMINPayload';
  error?: Maybe<ErrorType>;
  event?: Maybe<RaceEvent>;
};

export type RaceEventAdmin = {
  __typename?: 'RaceEventAdmin';
  event?: Maybe<Array<Maybe<RaceEventChild>>>;
  name?: Maybe<Scalars['String']['output']>;
  openDate: Scalars['String']['output'];
  selected: Scalars['Boolean']['output'];
};

export type RaceEventChild = {
  __typename?: 'RaceEventChild';
  eventId?: Maybe<Scalars['String']['output']>;
  eventStatus?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
};

export type RaceEventInput = {
  event?: InputMaybe<Array<InputMaybe<RaceEventInputChild>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  openDate?: InputMaybe<Scalars['String']['input']>;
  sportId?: InputMaybe<Scalars['Int']['input']>;
};

export type RaceEventInputChild = {
  eventId: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};

export type RaceMarketType = {
  __typename?: 'RaceMarketType';
  bettingType?: Maybe<Scalars['String']['output']>;
  marketId: Scalars['String']['output'];
  marketName: Scalars['String']['output'];
  marketTime?: Maybe<Scalars['String']['output']>;
  marketType?: Maybe<Scalars['String']['output']>;
  runners?: Maybe<Array<Maybe<MarketRunners>>>;
};

export type RunsList = {
  __typename?: 'RunsList';
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
};

export type SignUpInput = {
  creditLimit: Scalars['Int']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<UserRole>;
  status?: InputMaybe<AccountStatus>;
  userName: Scalars['String']['input'];
};

export type SportsEvent = {
  __typename?: 'SportsEvent';
  inPlay?: Maybe<Array<Maybe<Event>>>;
  upcoming?: Maybe<Array<Maybe<Event>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  betSettleSub?: Maybe<Scalars['String']['output']>;
  plSettleSubscription?: Maybe<Scalars['String']['output']>;
};

export type UpdateUserInput = {
  bettingStatus?: InputMaybe<Scalars['Boolean']['input']>;
  creditLimit?: InputMaybe<Scalars['Int']['input']>;
  stakes?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  transferStatus?: InputMaybe<Scalars['Boolean']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  availableCredit?: Maybe<Scalars['Int']['output']>;
  bet?: Maybe<Array<Maybe<BetType>>>;
  bettingStatus?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  creditDistributedByAgent?: Maybe<Scalars['Int']['output']>;
  creditGivenToAgent?: Maybe<Scalars['Int']['output']>;
  creditGivenToUser?: Maybe<Scalars['Int']['output']>;
  creditLimit?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  exposure?: Maybe<Scalars['Int']['output']>;
  loginStep?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<ParentUser>;
  password?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  stakes?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  status?: Maybe<Scalars['String']['output']>;
  transferStatus?: Maybe<Scalars['Boolean']['output']>;
  userName: Scalars['String']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Master = 'MASTER',
  Superadmin = 'SUPERADMIN',
  Supermaster = 'SUPERMASTER',
  User = 'USER'
}

export type UsersInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UsersPayload = {
  __typename?: 'UsersPayload';
  error?: Maybe<ErrorType>;
  user?: Maybe<Array<Maybe<User>>>;
};

export type PlInsideInputType = {
  price: Scalars['String']['input'];
  selectionId: Scalars['String']['input'];
};

export type AuthLoginMutationVariables = Exact<{
  input?: InputMaybe<AuthInput>;
}>;


export type AuthLoginMutation = { __typename?: 'Mutation', authLogin?: { __typename?: 'AuthPayload', token?: string | null, user?: { __typename?: 'User', _id: string, userName: string, status?: string | null, role?: string | null, availableCredit?: number | null, creditLimit?: number | null, transferStatus?: boolean | null, bettingStatus?: boolean | null, loginStep?: boolean | null, createdAt?: any | null } | null, error?: { __typename?: 'ErrorType', message: string, code: string } | null } | null };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'AuthPayload', token?: string | null, error?: { __typename?: 'ErrorType', message: string, code: string } | null, user?: { __typename?: 'User', _id: string } | null } | null };

export type CreatePlMutationVariables = Exact<{
  input: PlInputType;
}>;


export type CreatePlMutation = { __typename?: 'Mutation', createPL?: { __typename?: 'PLType', _id?: string | null, marketId?: string | null, pl?: Array<{ __typename?: 'PLInsideType', selectionId?: string | null, price?: number | null } | null> | null } | null };

export type DeleteBetMutationVariables = Exact<{
  betId?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeleteBetMutation = { __typename?: 'Mutation', deleteBet?: string | null };

export type PlaceBetMutationVariables = Exact<{
  input?: InputMaybe<BetInputType>;
}>;


export type PlaceBetMutation = { __typename?: 'Mutation', placeBet?: { __typename?: 'BetPayload', bet?: { __typename?: 'BetType', _id: string, userId: string, eventId: string, eventName: string, marketId: string, selectionId: string, runnerName: string, odds: number, stake: number, betType: string, profit: number, loss: number, bettingType?: string | null } | null, error?: { __typename?: 'ErrorType', message: string, code: string } | null } | null };

export type PlUpdateMutationVariables = Exact<{
  input: PlInputType;
}>;


export type PlUpdateMutation = { __typename?: 'Mutation', plUpdate?: { __typename?: 'PLType', _id?: string | null, marketId?: string | null, pl?: Array<{ __typename?: 'PLInsideType', selectionId?: string | null, price?: number | null } | null> | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input?: InputMaybe<UpdateUserInput>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'AuthPayload', token?: string | null, user?: { __typename?: 'User', _id: string, userName: string, name?: string | null, email?: string | null, password?: string | null, status?: string | null, role?: string | null, stakes?: Array<number | null> | null } | null, error?: { __typename?: 'ErrorType', message: string, code: string } | null } | null };

export type GetBookmakerListQueryVariables = Exact<{
  input: Scalars['Int']['input'];
}>;


export type GetBookmakerListQuery = { __typename?: 'Query', getBookmakerList: Array<{ __typename?: 'BookmakerMarketType', marketId: string, marketName: string, bettingType?: string | null, runners?: Array<{ __typename?: 'BookmakerMarketRunners', runnerName?: string | null, selectionId: string, marketStatus?: string | null, ballRunning?: boolean | null, eventStatus?: string | null, status: string, lay?: Array<{ __typename?: 'PriceSize', line?: number | null, price: number, size: number } | null> | null, back?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null } | null> | null } | null> };

export type CasinoGamesListQueryVariables = Exact<{ [key: string]: never; }>;


export type CasinoGamesListQuery = { __typename?: 'Query', casinoGamesList?: Array<{ __typename?: 'CasinoGamesType', uuid: string, name: string, image: string, type: string, provider: string, technology: string, has_lobby: number, is_mobile: number, has_freespins: number, has_tables: number, freespin_valid_until_full_day: number } | null> | null };

export type CasinoGameInitQueryVariables = Exact<{
  input?: InputMaybe<CasinoGamesInitInputType>;
}>;


export type CasinoGameInitQuery = { __typename?: 'Query', casinoGameInit?: { __typename?: 'CasinoGameInitType', url: string } | null };

export type GetEventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type GetEventQuery = { __typename?: 'Query', getEvent?: { __typename?: 'Event', id: string, sportId: number, eventId: string, competitionName: string, competitionId: number, name: string, openDate: any, minLimit: number, maxLimit: number, betDelay: number, maxOdd: number } | null };

export type GetEventBetsQueryVariables = Exact<{
  eventId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEventBetsQuery = { __typename?: 'Query', getEventBets: Array<{ __typename?: 'BetType', _id: string, userId: string, eventId: string, eventName: string, marketId: string, selectionId: string, runnerName: string, odds: number, stake: number, betType: string, settled?: boolean | null, win?: boolean | null, profit: number, loss: number, createdAt?: any | null, run?: number | null } | null> };

export type GetEventsBySearchQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEventsBySearchQuery = { __typename?: 'Query', getEventsBySearch?: Array<{ __typename?: 'Event', id: string, sportId: number, eventId: string, competitionName: string, competitionId: number, name: string, openDate: any } | null> | null };

export type GetEventMarketQueryVariables = Exact<{
  input: Scalars['Int']['input'];
}>;


export type GetEventMarketQuery = { __typename?: 'Query', getEventMarket: Array<{ __typename?: 'EventMarketType', marketId: string, marketName: string, bettingType?: string | null, runners?: Array<{ __typename?: 'MarketRunners', runnerName?: string | null, selectionId: string, status: string, marketStatus?: string | null, ballRunning?: boolean | null, eventStatus: string, back?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null, lay?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null } | null> | null } | null> };

export type GetEventMarketOddsQueryVariables = Exact<{
  input: Scalars['Int']['input'];
}>;


export type GetEventMarketOddsQuery = { __typename?: 'Query', getEventMarketOdds: Array<{ __typename?: 'MarketType', marketId: string, marketName: string, bettingType?: string | null, runners?: Array<{ __typename?: 'MarketRunners', selectionId: string, runnerName?: string | null, status: string, marketStatus?: string | null, ballRunning?: boolean | null, back?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null, lay?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null } | null> | null } | null> };

export type GetEventPlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventPlQuery = { __typename?: 'Query', getEventPL?: Array<{ __typename?: 'EventPl', name?: string | null, date?: string | null, pl?: number | null, sport?: number | null, eventId?: number | null } | null> | null };

export type GetFancyQueryVariables = Exact<{
  input: Scalars['Int']['input'];
}>;


export type GetFancyQuery = { __typename?: 'Query', getFancy?: Array<{ __typename?: 'FancyMarketNEW', bettingType?: string | null, status?: string | null, runnerName?: string | null, selectionId?: string | null, marketType?: string | null, marketId?: string | null, back?: { __typename?: 'PriceSize', price: number, size: number } | null, lay?: { __typename?: 'PriceSize', price: number, size: number } | null } | null> | null };

export type GetFancyPlQueryVariables = Exact<{
  marketId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetFancyPlQuery = { __typename?: 'Query', getFancyPl?: { __typename?: 'FancyPl', exposure?: number | null, runs?: Array<{ __typename?: 'RunsList', name?: string | null, price?: number | null } | null> | null } | null };

export type GetRaceMarketQueryVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type GetRaceMarketQuery = { __typename?: 'Query', getRaceMarket?: { __typename?: 'EventMarketType', marketId: string, marketName: string, marketType?: string | null, marketTime?: string | null, bettingType?: string | null, runners?: Array<{ __typename?: 'MarketRunners', selectionId: string, runnerName?: string | null, status: string, marketStatus?: string | null, ballRunning?: boolean | null, eventStatus: string, back?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null, lay?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null } | null> | null } | null };

export type GetMarketPlQueryVariables = Exact<{
  marketId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMarketPlQuery = { __typename?: 'Query', getMarketPl?: { __typename?: 'PLType', _id?: string | null, userId?: string | null, marketId?: string | null, pl?: Array<{ __typename?: 'PLInsideType', selectionId?: string | null, price?: number | null } | null> | null } | null };

export type GetRaceQueryVariables = Exact<{
  input: Scalars['ID']['input'];
}>;


export type GetRaceQuery = { __typename?: 'Query', getRace?: { __typename?: 'RaceEvent', id: string, eventId: string, name?: string | null, openDate: string, minLimit: number, maxLimit: number, betDelay: number, maxOdd: number, sportId: number } | null };

export type GetRacesQueryVariables = Exact<{
  input: Scalars['Int']['input'];
}>;


export type GetRacesQuery = { __typename?: 'Query', getRaces?: Array<{ __typename?: 'RaceEvent', id: string, name?: string | null, openDate: string, minLimit: number, maxLimit: number, betDelay: number, maxOdd: number, event?: Array<{ __typename?: 'RaceEventChild', eventId?: string | null, startTime?: string | null, eventStatus?: string | null } | null> | null } | null> | null };

export type GetSportEventsQueryVariables = Exact<{
  input: Scalars['Int']['input'];
}>;


export type GetSportEventsQuery = { __typename?: 'Query', getSportEvents?: { __typename?: 'SportsEvent', inPlay?: Array<{ __typename?: 'Event', id: string, sportId: number, eventId: string, competitionName: string, competitionId: number, name: string, openDate: any, minLimit: number, maxLimit: number, betDelay: number, maxOdd: number, market?: Array<{ __typename?: 'MarketType', marketId: string, marketName: string, marketType?: string | null, marketTime?: string | null, bettingType?: string | null, runners?: Array<{ __typename?: 'MarketRunners', selectionId: string, runnerName?: string | null, ballRunning?: boolean | null, back?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null, lay?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null } | null> | null } | null> | null } | null> | null, upcoming?: Array<{ __typename?: 'Event', id: string, sportId: number, eventId: string, competitionName: string, competitionId: number, name: string, openDate: any, minLimit: number, maxLimit: number, betDelay: number, maxOdd: number, market?: Array<{ __typename?: 'MarketType', marketId: string, marketName: string, marketType?: string | null, marketTime?: string | null, bettingType?: string | null, runners?: Array<{ __typename?: 'MarketRunners', selectionId: string, runnerName?: string | null, ballRunning?: boolean | null, back?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null, lay?: Array<{ __typename?: 'PriceSize', price: number, size: number, line?: number | null } | null> | null } | null> | null } | null> | null } | null> | null } | null };

export type UnMatchedBetsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnMatchedBetsQuery = { __typename?: 'Query', unMatchedBets?: Array<{ __typename?: 'BetType', _id: string, betType: string, createdAt?: any | null, eventId: string, eventName: string, loss: number, odds: number, profit: number, runnerName: string, stake: number } | null> | null };

export type InPlayQueryVariables = Exact<{ [key: string]: never; }>;


export type InPlayQuery = { __typename?: 'Query', inPlay?: { __typename?: 'EventListsType', cricket?: Array<{ __typename?: 'Event', id: string, sportId: number, eventId: string, competitionName: string, competitionId: number, name: string, openDate: any, minLimit: number, maxLimit: number, betDelay: number, market?: Array<{ __typename?: 'MarketType', marketId: string, marketName: string, runners?: Array<{ __typename?: 'MarketRunners', selectionId: string, runnerName?: string | null, status: string, back?: Array<{ __typename?: 'PriceSize', price: number, size: number } | null> | null, lay?: Array<{ __typename?: 'PriceSize', price: number, size: number } | null> | null } | null> | null } | null> | null } | null> | null, football?: Array<{ __typename?: 'Event', id: string, sportId: number, eventId: string, competitionName: string, competitionId: number, name: string, openDate: any, minLimit: number, maxLimit: number, betDelay: number, market?: Array<{ __typename?: 'MarketType', marketId: string, marketName: string, runners?: Array<{ __typename?: 'MarketRunners', selectionId: string, runnerName?: string | null, status: string, back?: Array<{ __typename?: 'PriceSize', price: number, size: number } | null> | null, lay?: Array<{ __typename?: 'PriceSize', price: number, size: number } | null> | null } | null> | null } | null> | null } | null> | null, tennis?: Array<{ __typename?: 'Event', id: string, sportId: number, eventId: string, competitionName: string, competitionId: number, name: string, openDate: any, minLimit: number, maxLimit: number, betDelay: number, market?: Array<{ __typename?: 'MarketType', marketId: string, marketName: string, runners?: Array<{ __typename?: 'MarketRunners', selectionId: string, runnerName?: string | null, status: string, back?: Array<{ __typename?: 'PriceSize', price: number, size: number } | null> | null, lay?: Array<{ __typename?: 'PriceSize', price: number, size: number } | null> | null } | null> | null } | null> | null } | null> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: string, userName: string, status?: string | null, role?: string | null, availableCredit?: number | null, exposure?: number | null, creditLimit?: number | null, transferStatus?: boolean | null, bettingStatus?: boolean | null, stakes?: Array<number | null> | null, loginStep?: boolean | null, createdAt?: any | null } | null };

export type OpenBetsQueryVariables = Exact<{
  input?: InputMaybe<BetEnumType>;
}>;


export type OpenBetsQuery = { __typename?: 'Query', openBets?: Array<{ __typename?: 'BetType', _id: string, userId: string, eventId: string, sportId?: number | null, eventName: string, marketId: string, selectionId: string, runnerName: string, bettingType?: string | null, odds: number, stake: number, betType: string, settled?: boolean | null, win?: boolean | null, profit: number, loss: number, createdAt?: any | null, run?: number | null } | null> | null };

export type BetSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BetSubscription = { __typename?: 'Subscription', betSettleSub?: string | null };

export type PlSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PlSubscription = { __typename?: 'Subscription', plSettleSubscription?: string | null };


export const AuthLoginDocument = gql`
    mutation AuthLogin($input: AuthInput) {
  authLogin(input: $input) {
    token
    user {
      _id
      userName
      status
      role
      availableCredit
      creditLimit
      transferStatus
      bettingStatus
      loginStep
      createdAt
    }
    error {
      message
      code
    }
  }
}
    `;
export type AuthLoginMutationFn = Apollo.MutationFunction<AuthLoginMutation, AuthLoginMutationVariables>;

/**
 * __useAuthLoginMutation__
 *
 * To run a mutation, you first call `useAuthLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authLoginMutation, { data, loading, error }] = useAuthLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthLoginMutation(baseOptions?: Apollo.MutationHookOptions<AuthLoginMutation, AuthLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthLoginMutation, AuthLoginMutationVariables>(AuthLoginDocument, options);
      }
export type AuthLoginMutationHookResult = ReturnType<typeof useAuthLoginMutation>;
export type AuthLoginMutationResult = Apollo.MutationResult<AuthLoginMutation>;
export type AuthLoginMutationOptions = Apollo.BaseMutationOptions<AuthLoginMutation, AuthLoginMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    token
    error {
      message
      code
    }
    user {
      _id
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePlDocument = gql`
    mutation CreatePL($input: PLInputType!) {
  createPL(input: $input) {
    _id
    marketId
    pl {
      selectionId
      price
    }
  }
}
    `;
export type CreatePlMutationFn = Apollo.MutationFunction<CreatePlMutation, CreatePlMutationVariables>;

/**
 * __useCreatePlMutation__
 *
 * To run a mutation, you first call `useCreatePlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlMutation, { data, loading, error }] = useCreatePlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlMutation, CreatePlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlMutation, CreatePlMutationVariables>(CreatePlDocument, options);
      }
export type CreatePlMutationHookResult = ReturnType<typeof useCreatePlMutation>;
export type CreatePlMutationResult = Apollo.MutationResult<CreatePlMutation>;
export type CreatePlMutationOptions = Apollo.BaseMutationOptions<CreatePlMutation, CreatePlMutationVariables>;
export const DeleteBetDocument = gql`
    mutation DeleteBet($betId: String) {
  deleteBet(betId: $betId)
}
    `;
export type DeleteBetMutationFn = Apollo.MutationFunction<DeleteBetMutation, DeleteBetMutationVariables>;

/**
 * __useDeleteBetMutation__
 *
 * To run a mutation, you first call `useDeleteBetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBetMutation, { data, loading, error }] = useDeleteBetMutation({
 *   variables: {
 *      betId: // value for 'betId'
 *   },
 * });
 */
export function useDeleteBetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBetMutation, DeleteBetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBetMutation, DeleteBetMutationVariables>(DeleteBetDocument, options);
      }
export type DeleteBetMutationHookResult = ReturnType<typeof useDeleteBetMutation>;
export type DeleteBetMutationResult = Apollo.MutationResult<DeleteBetMutation>;
export type DeleteBetMutationOptions = Apollo.BaseMutationOptions<DeleteBetMutation, DeleteBetMutationVariables>;
export const PlaceBetDocument = gql`
    mutation PlaceBet($input: BetInputType) {
  placeBet(input: $input) {
    bet {
      _id
      userId
      eventId
      eventName
      marketId
      selectionId
      runnerName
      odds
      stake
      betType
      profit
      loss
      bettingType
    }
    error {
      message
      code
    }
  }
}
    `;
export type PlaceBetMutationFn = Apollo.MutationFunction<PlaceBetMutation, PlaceBetMutationVariables>;

/**
 * __usePlaceBetMutation__
 *
 * To run a mutation, you first call `usePlaceBetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaceBetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [placeBetMutation, { data, loading, error }] = usePlaceBetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePlaceBetMutation(baseOptions?: Apollo.MutationHookOptions<PlaceBetMutation, PlaceBetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PlaceBetMutation, PlaceBetMutationVariables>(PlaceBetDocument, options);
      }
export type PlaceBetMutationHookResult = ReturnType<typeof usePlaceBetMutation>;
export type PlaceBetMutationResult = Apollo.MutationResult<PlaceBetMutation>;
export type PlaceBetMutationOptions = Apollo.BaseMutationOptions<PlaceBetMutation, PlaceBetMutationVariables>;
export const PlUpdateDocument = gql`
    mutation PlUpdate($input: PLInputType!) {
  plUpdate(input: $input) {
    _id
    marketId
    pl {
      selectionId
      price
    }
  }
}
    `;
export type PlUpdateMutationFn = Apollo.MutationFunction<PlUpdateMutation, PlUpdateMutationVariables>;

/**
 * __usePlUpdateMutation__
 *
 * To run a mutation, you first call `usePlUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [plUpdateMutation, { data, loading, error }] = usePlUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePlUpdateMutation(baseOptions?: Apollo.MutationHookOptions<PlUpdateMutation, PlUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PlUpdateMutation, PlUpdateMutationVariables>(PlUpdateDocument, options);
      }
export type PlUpdateMutationHookResult = ReturnType<typeof usePlUpdateMutation>;
export type PlUpdateMutationResult = Apollo.MutationResult<PlUpdateMutation>;
export type PlUpdateMutationOptions = Apollo.BaseMutationOptions<PlUpdateMutation, PlUpdateMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput) {
  updateUser(input: $input) {
    user {
      _id
      userName
      name
      email
      password
      status
      role
      stakes
    }
    token
    error {
      message
      code
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetBookmakerListDocument = gql`
    query GetBookmakerList($input: Int!) {
  getBookmakerList(input: $input) {
    marketId
    marketName
    bettingType
    runners {
      runnerName
      selectionId
      marketStatus
      ballRunning
      eventStatus
      status
      lay {
        line
        price
        size
      }
      back {
        price
        size
        line
      }
    }
  }
}
    `;

/**
 * __useGetBookmakerListQuery__
 *
 * To run a query within a React component, call `useGetBookmakerListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookmakerListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookmakerListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBookmakerListQuery(baseOptions: Apollo.QueryHookOptions<GetBookmakerListQuery, GetBookmakerListQueryVariables> & ({ variables: GetBookmakerListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookmakerListQuery, GetBookmakerListQueryVariables>(GetBookmakerListDocument, options);
      }
export function useGetBookmakerListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookmakerListQuery, GetBookmakerListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookmakerListQuery, GetBookmakerListQueryVariables>(GetBookmakerListDocument, options);
        }
export function useGetBookmakerListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBookmakerListQuery, GetBookmakerListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookmakerListQuery, GetBookmakerListQueryVariables>(GetBookmakerListDocument, options);
        }
export type GetBookmakerListQueryHookResult = ReturnType<typeof useGetBookmakerListQuery>;
export type GetBookmakerListLazyQueryHookResult = ReturnType<typeof useGetBookmakerListLazyQuery>;
export type GetBookmakerListSuspenseQueryHookResult = ReturnType<typeof useGetBookmakerListSuspenseQuery>;
export type GetBookmakerListQueryResult = Apollo.QueryResult<GetBookmakerListQuery, GetBookmakerListQueryVariables>;
export const CasinoGamesListDocument = gql`
    query CasinoGamesList {
  casinoGamesList {
    uuid
    name
    image
    type
    provider
    technology
    has_lobby
    is_mobile
    has_freespins
    has_tables
    freespin_valid_until_full_day
  }
}
    `;

/**
 * __useCasinoGamesListQuery__
 *
 * To run a query within a React component, call `useCasinoGamesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCasinoGamesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCasinoGamesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useCasinoGamesListQuery(baseOptions?: Apollo.QueryHookOptions<CasinoGamesListQuery, CasinoGamesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CasinoGamesListQuery, CasinoGamesListQueryVariables>(CasinoGamesListDocument, options);
      }
export function useCasinoGamesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CasinoGamesListQuery, CasinoGamesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CasinoGamesListQuery, CasinoGamesListQueryVariables>(CasinoGamesListDocument, options);
        }
export function useCasinoGamesListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CasinoGamesListQuery, CasinoGamesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CasinoGamesListQuery, CasinoGamesListQueryVariables>(CasinoGamesListDocument, options);
        }
export type CasinoGamesListQueryHookResult = ReturnType<typeof useCasinoGamesListQuery>;
export type CasinoGamesListLazyQueryHookResult = ReturnType<typeof useCasinoGamesListLazyQuery>;
export type CasinoGamesListSuspenseQueryHookResult = ReturnType<typeof useCasinoGamesListSuspenseQuery>;
export type CasinoGamesListQueryResult = Apollo.QueryResult<CasinoGamesListQuery, CasinoGamesListQueryVariables>;
export const CasinoGameInitDocument = gql`
    query CasinoGameInit($input: CasinoGamesInitInputType) {
  casinoGameInit(input: $input) {
    url
  }
}
    `;

/**
 * __useCasinoGameInitQuery__
 *
 * To run a query within a React component, call `useCasinoGameInitQuery` and pass it any options that fit your needs.
 * When your component renders, `useCasinoGameInitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCasinoGameInitQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCasinoGameInitQuery(baseOptions?: Apollo.QueryHookOptions<CasinoGameInitQuery, CasinoGameInitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CasinoGameInitQuery, CasinoGameInitQueryVariables>(CasinoGameInitDocument, options);
      }
export function useCasinoGameInitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CasinoGameInitQuery, CasinoGameInitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CasinoGameInitQuery, CasinoGameInitQueryVariables>(CasinoGameInitDocument, options);
        }
export function useCasinoGameInitSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CasinoGameInitQuery, CasinoGameInitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CasinoGameInitQuery, CasinoGameInitQueryVariables>(CasinoGameInitDocument, options);
        }
export type CasinoGameInitQueryHookResult = ReturnType<typeof useCasinoGameInitQuery>;
export type CasinoGameInitLazyQueryHookResult = ReturnType<typeof useCasinoGameInitLazyQuery>;
export type CasinoGameInitSuspenseQueryHookResult = ReturnType<typeof useCasinoGameInitSuspenseQuery>;
export type CasinoGameInitQueryResult = Apollo.QueryResult<CasinoGameInitQuery, CasinoGameInitQueryVariables>;
export const GetEventDocument = gql`
    query GetEvent($eventId: Int!) {
  getEvent(eventId: $eventId) {
    id
    sportId
    eventId
    competitionName
    competitionId
    name
    openDate
    minLimit
    maxLimit
    betDelay
    maxOdd
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables> & ({ variables: GetEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export function useGetEventSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventSuspenseQueryHookResult = ReturnType<typeof useGetEventSuspenseQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const GetEventBetsDocument = gql`
    query GetEventBets($eventId: String) {
  getEventBets(eventId: $eventId) {
    _id
    userId
    eventId
    eventName
    marketId
    selectionId
    runnerName
    odds
    stake
    betType
    settled
    win
    profit
    loss
    createdAt
    run
  }
}
    `;

/**
 * __useGetEventBetsQuery__
 *
 * To run a query within a React component, call `useGetEventBetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventBetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventBetsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventBetsQuery(baseOptions?: Apollo.QueryHookOptions<GetEventBetsQuery, GetEventBetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventBetsQuery, GetEventBetsQueryVariables>(GetEventBetsDocument, options);
      }
export function useGetEventBetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventBetsQuery, GetEventBetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventBetsQuery, GetEventBetsQueryVariables>(GetEventBetsDocument, options);
        }
export function useGetEventBetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventBetsQuery, GetEventBetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventBetsQuery, GetEventBetsQueryVariables>(GetEventBetsDocument, options);
        }
export type GetEventBetsQueryHookResult = ReturnType<typeof useGetEventBetsQuery>;
export type GetEventBetsLazyQueryHookResult = ReturnType<typeof useGetEventBetsLazyQuery>;
export type GetEventBetsSuspenseQueryHookResult = ReturnType<typeof useGetEventBetsSuspenseQuery>;
export type GetEventBetsQueryResult = Apollo.QueryResult<GetEventBetsQuery, GetEventBetsQueryVariables>;
export const GetEventsBySearchDocument = gql`
    query GetEventsBySearch($query: String) {
  getEventsBySearch(query: $query) {
    id
    sportId
    eventId
    competitionName
    competitionId
    name
    openDate
  }
}
    `;

/**
 * __useGetEventsBySearchQuery__
 *
 * To run a query within a React component, call `useGetEventsBySearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsBySearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsBySearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetEventsBySearchQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsBySearchQuery, GetEventsBySearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsBySearchQuery, GetEventsBySearchQueryVariables>(GetEventsBySearchDocument, options);
      }
export function useGetEventsBySearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsBySearchQuery, GetEventsBySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsBySearchQuery, GetEventsBySearchQueryVariables>(GetEventsBySearchDocument, options);
        }
export function useGetEventsBySearchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventsBySearchQuery, GetEventsBySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsBySearchQuery, GetEventsBySearchQueryVariables>(GetEventsBySearchDocument, options);
        }
export type GetEventsBySearchQueryHookResult = ReturnType<typeof useGetEventsBySearchQuery>;
export type GetEventsBySearchLazyQueryHookResult = ReturnType<typeof useGetEventsBySearchLazyQuery>;
export type GetEventsBySearchSuspenseQueryHookResult = ReturnType<typeof useGetEventsBySearchSuspenseQuery>;
export type GetEventsBySearchQueryResult = Apollo.QueryResult<GetEventsBySearchQuery, GetEventsBySearchQueryVariables>;
export const GetEventMarketDocument = gql`
    query GetEventMarket($input: Int!) {
  getEventMarket(input: $input) {
    marketId
    marketName
    bettingType
    runners {
      back {
        price
        size
        line
      }
      lay {
        price
        size
        line
      }
      runnerName
      selectionId
      status
      marketStatus
      ballRunning
      eventStatus
    }
  }
}
    `;

/**
 * __useGetEventMarketQuery__
 *
 * To run a query within a React component, call `useGetEventMarketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventMarketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventMarketQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventMarketQuery(baseOptions: Apollo.QueryHookOptions<GetEventMarketQuery, GetEventMarketQueryVariables> & ({ variables: GetEventMarketQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventMarketQuery, GetEventMarketQueryVariables>(GetEventMarketDocument, options);
      }
export function useGetEventMarketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventMarketQuery, GetEventMarketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventMarketQuery, GetEventMarketQueryVariables>(GetEventMarketDocument, options);
        }
export function useGetEventMarketSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventMarketQuery, GetEventMarketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventMarketQuery, GetEventMarketQueryVariables>(GetEventMarketDocument, options);
        }
export type GetEventMarketQueryHookResult = ReturnType<typeof useGetEventMarketQuery>;
export type GetEventMarketLazyQueryHookResult = ReturnType<typeof useGetEventMarketLazyQuery>;
export type GetEventMarketSuspenseQueryHookResult = ReturnType<typeof useGetEventMarketSuspenseQuery>;
export type GetEventMarketQueryResult = Apollo.QueryResult<GetEventMarketQuery, GetEventMarketQueryVariables>;
export const GetEventMarketOddsDocument = gql`
    query GetEventMarketOdds($input: Int!) {
  getEventMarketOdds(input: $input) {
    marketId
    marketName
    bettingType
    runners {
      selectionId
      runnerName
      status
      back {
        price
        size
        line
      }
      lay {
        price
        size
        line
      }
      marketStatus
      ballRunning
    }
  }
}
    `;

/**
 * __useGetEventMarketOddsQuery__
 *
 * To run a query within a React component, call `useGetEventMarketOddsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventMarketOddsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventMarketOddsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventMarketOddsQuery(baseOptions: Apollo.QueryHookOptions<GetEventMarketOddsQuery, GetEventMarketOddsQueryVariables> & ({ variables: GetEventMarketOddsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventMarketOddsQuery, GetEventMarketOddsQueryVariables>(GetEventMarketOddsDocument, options);
      }
export function useGetEventMarketOddsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventMarketOddsQuery, GetEventMarketOddsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventMarketOddsQuery, GetEventMarketOddsQueryVariables>(GetEventMarketOddsDocument, options);
        }
export function useGetEventMarketOddsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventMarketOddsQuery, GetEventMarketOddsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventMarketOddsQuery, GetEventMarketOddsQueryVariables>(GetEventMarketOddsDocument, options);
        }
export type GetEventMarketOddsQueryHookResult = ReturnType<typeof useGetEventMarketOddsQuery>;
export type GetEventMarketOddsLazyQueryHookResult = ReturnType<typeof useGetEventMarketOddsLazyQuery>;
export type GetEventMarketOddsSuspenseQueryHookResult = ReturnType<typeof useGetEventMarketOddsSuspenseQuery>;
export type GetEventMarketOddsQueryResult = Apollo.QueryResult<GetEventMarketOddsQuery, GetEventMarketOddsQueryVariables>;
export const GetEventPlDocument = gql`
    query GetEventPL {
  getEventPL {
    name
    date
    pl
    sport
    eventId
  }
}
    `;

/**
 * __useGetEventPlQuery__
 *
 * To run a query within a React component, call `useGetEventPlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventPlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventPlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventPlQuery(baseOptions?: Apollo.QueryHookOptions<GetEventPlQuery, GetEventPlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventPlQuery, GetEventPlQueryVariables>(GetEventPlDocument, options);
      }
export function useGetEventPlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventPlQuery, GetEventPlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventPlQuery, GetEventPlQueryVariables>(GetEventPlDocument, options);
        }
export function useGetEventPlSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventPlQuery, GetEventPlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventPlQuery, GetEventPlQueryVariables>(GetEventPlDocument, options);
        }
export type GetEventPlQueryHookResult = ReturnType<typeof useGetEventPlQuery>;
export type GetEventPlLazyQueryHookResult = ReturnType<typeof useGetEventPlLazyQuery>;
export type GetEventPlSuspenseQueryHookResult = ReturnType<typeof useGetEventPlSuspenseQuery>;
export type GetEventPlQueryResult = Apollo.QueryResult<GetEventPlQuery, GetEventPlQueryVariables>;
export const GetFancyDocument = gql`
    query GetFancy($input: Int!) {
  getFancy(input: $input) {
    bettingType
    status
    runnerName
    selectionId
    marketType
    marketId
    back {
      price
      size
    }
    lay {
      price
      size
    }
  }
}
    `;

/**
 * __useGetFancyQuery__
 *
 * To run a query within a React component, call `useGetFancyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFancyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFancyQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFancyQuery(baseOptions: Apollo.QueryHookOptions<GetFancyQuery, GetFancyQueryVariables> & ({ variables: GetFancyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFancyQuery, GetFancyQueryVariables>(GetFancyDocument, options);
      }
export function useGetFancyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFancyQuery, GetFancyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFancyQuery, GetFancyQueryVariables>(GetFancyDocument, options);
        }
export function useGetFancySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFancyQuery, GetFancyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFancyQuery, GetFancyQueryVariables>(GetFancyDocument, options);
        }
export type GetFancyQueryHookResult = ReturnType<typeof useGetFancyQuery>;
export type GetFancyLazyQueryHookResult = ReturnType<typeof useGetFancyLazyQuery>;
export type GetFancySuspenseQueryHookResult = ReturnType<typeof useGetFancySuspenseQuery>;
export type GetFancyQueryResult = Apollo.QueryResult<GetFancyQuery, GetFancyQueryVariables>;
export const GetFancyPlDocument = gql`
    query GetFancyPl($marketId: Int) {
  getFancyPl(marketId: $marketId) {
    exposure
    runs {
      name
      price
    }
  }
}
    `;

/**
 * __useGetFancyPlQuery__
 *
 * To run a query within a React component, call `useGetFancyPlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFancyPlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFancyPlQuery({
 *   variables: {
 *      marketId: // value for 'marketId'
 *   },
 * });
 */
export function useGetFancyPlQuery(baseOptions?: Apollo.QueryHookOptions<GetFancyPlQuery, GetFancyPlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFancyPlQuery, GetFancyPlQueryVariables>(GetFancyPlDocument, options);
      }
export function useGetFancyPlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFancyPlQuery, GetFancyPlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFancyPlQuery, GetFancyPlQueryVariables>(GetFancyPlDocument, options);
        }
export function useGetFancyPlSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFancyPlQuery, GetFancyPlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFancyPlQuery, GetFancyPlQueryVariables>(GetFancyPlDocument, options);
        }
export type GetFancyPlQueryHookResult = ReturnType<typeof useGetFancyPlQuery>;
export type GetFancyPlLazyQueryHookResult = ReturnType<typeof useGetFancyPlLazyQuery>;
export type GetFancyPlSuspenseQueryHookResult = ReturnType<typeof useGetFancyPlSuspenseQuery>;
export type GetFancyPlQueryResult = Apollo.QueryResult<GetFancyPlQuery, GetFancyPlQueryVariables>;
export const GetRaceMarketDocument = gql`
    query GetRaceMarket($input: String!) {
  getRaceMarket(input: $input) {
    marketId
    marketName
    marketType
    marketTime
    bettingType
    runners {
      selectionId
      runnerName
      status
      back {
        price
        size
        line
      }
      lay {
        price
        size
        line
      }
      marketStatus
      ballRunning
      eventStatus
    }
  }
}
    `;

/**
 * __useGetRaceMarketQuery__
 *
 * To run a query within a React component, call `useGetRaceMarketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRaceMarketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRaceMarketQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetRaceMarketQuery(baseOptions: Apollo.QueryHookOptions<GetRaceMarketQuery, GetRaceMarketQueryVariables> & ({ variables: GetRaceMarketQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRaceMarketQuery, GetRaceMarketQueryVariables>(GetRaceMarketDocument, options);
      }
export function useGetRaceMarketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRaceMarketQuery, GetRaceMarketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRaceMarketQuery, GetRaceMarketQueryVariables>(GetRaceMarketDocument, options);
        }
export function useGetRaceMarketSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRaceMarketQuery, GetRaceMarketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRaceMarketQuery, GetRaceMarketQueryVariables>(GetRaceMarketDocument, options);
        }
export type GetRaceMarketQueryHookResult = ReturnType<typeof useGetRaceMarketQuery>;
export type GetRaceMarketLazyQueryHookResult = ReturnType<typeof useGetRaceMarketLazyQuery>;
export type GetRaceMarketSuspenseQueryHookResult = ReturnType<typeof useGetRaceMarketSuspenseQuery>;
export type GetRaceMarketQueryResult = Apollo.QueryResult<GetRaceMarketQuery, GetRaceMarketQueryVariables>;
export const GetMarketPlDocument = gql`
    query GetMarketPl($marketId: String) {
  getMarketPl(marketId: $marketId) {
    _id
    userId
    marketId
    pl {
      selectionId
      price
    }
  }
}
    `;

/**
 * __useGetMarketPlQuery__
 *
 * To run a query within a React component, call `useGetMarketPlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarketPlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarketPlQuery({
 *   variables: {
 *      marketId: // value for 'marketId'
 *   },
 * });
 */
export function useGetMarketPlQuery(baseOptions?: Apollo.QueryHookOptions<GetMarketPlQuery, GetMarketPlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMarketPlQuery, GetMarketPlQueryVariables>(GetMarketPlDocument, options);
      }
export function useGetMarketPlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMarketPlQuery, GetMarketPlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMarketPlQuery, GetMarketPlQueryVariables>(GetMarketPlDocument, options);
        }
export function useGetMarketPlSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMarketPlQuery, GetMarketPlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMarketPlQuery, GetMarketPlQueryVariables>(GetMarketPlDocument, options);
        }
export type GetMarketPlQueryHookResult = ReturnType<typeof useGetMarketPlQuery>;
export type GetMarketPlLazyQueryHookResult = ReturnType<typeof useGetMarketPlLazyQuery>;
export type GetMarketPlSuspenseQueryHookResult = ReturnType<typeof useGetMarketPlSuspenseQuery>;
export type GetMarketPlQueryResult = Apollo.QueryResult<GetMarketPlQuery, GetMarketPlQueryVariables>;
export const GetRaceDocument = gql`
    query GetRace($input: ID!) {
  getRace(input: $input) {
    id
    eventId
    name
    openDate
    minLimit
    maxLimit
    betDelay
    maxOdd
    sportId
  }
}
    `;

/**
 * __useGetRaceQuery__
 *
 * To run a query within a React component, call `useGetRaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRaceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetRaceQuery(baseOptions: Apollo.QueryHookOptions<GetRaceQuery, GetRaceQueryVariables> & ({ variables: GetRaceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRaceQuery, GetRaceQueryVariables>(GetRaceDocument, options);
      }
export function useGetRaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRaceQuery, GetRaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRaceQuery, GetRaceQueryVariables>(GetRaceDocument, options);
        }
export function useGetRaceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRaceQuery, GetRaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRaceQuery, GetRaceQueryVariables>(GetRaceDocument, options);
        }
export type GetRaceQueryHookResult = ReturnType<typeof useGetRaceQuery>;
export type GetRaceLazyQueryHookResult = ReturnType<typeof useGetRaceLazyQuery>;
export type GetRaceSuspenseQueryHookResult = ReturnType<typeof useGetRaceSuspenseQuery>;
export type GetRaceQueryResult = Apollo.QueryResult<GetRaceQuery, GetRaceQueryVariables>;
export const GetRacesDocument = gql`
    query GetRaces($input: Int!) {
  getRaces(input: $input) {
    id
    name
    openDate
    minLimit
    maxLimit
    betDelay
    maxOdd
    event {
      eventId
      startTime
      eventStatus
    }
  }
}
    `;

/**
 * __useGetRacesQuery__
 *
 * To run a query within a React component, call `useGetRacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRacesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetRacesQuery(baseOptions: Apollo.QueryHookOptions<GetRacesQuery, GetRacesQueryVariables> & ({ variables: GetRacesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRacesQuery, GetRacesQueryVariables>(GetRacesDocument, options);
      }
export function useGetRacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRacesQuery, GetRacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRacesQuery, GetRacesQueryVariables>(GetRacesDocument, options);
        }
export function useGetRacesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRacesQuery, GetRacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRacesQuery, GetRacesQueryVariables>(GetRacesDocument, options);
        }
export type GetRacesQueryHookResult = ReturnType<typeof useGetRacesQuery>;
export type GetRacesLazyQueryHookResult = ReturnType<typeof useGetRacesLazyQuery>;
export type GetRacesSuspenseQueryHookResult = ReturnType<typeof useGetRacesSuspenseQuery>;
export type GetRacesQueryResult = Apollo.QueryResult<GetRacesQuery, GetRacesQueryVariables>;
export const GetSportEventsDocument = gql`
    query GetSportEvents($input: Int!) {
  getSportEvents(input: $input) {
    inPlay {
      id
      sportId
      eventId
      competitionName
      competitionId
      name
      openDate
      minLimit
      maxLimit
      betDelay
      maxOdd
      market {
        marketId
        marketName
        marketType
        marketTime
        bettingType
        runners {
          selectionId
          runnerName
          back {
            price
            size
            line
          }
          lay {
            price
            size
            line
          }
          ballRunning
        }
      }
    }
    upcoming {
      id
      sportId
      eventId
      competitionName
      competitionId
      name
      openDate
      minLimit
      maxLimit
      betDelay
      maxOdd
      market {
        marketId
        marketName
        marketType
        marketTime
        bettingType
        runners {
          selectionId
          runnerName
          back {
            price
            size
            line
          }
          lay {
            price
            size
            line
          }
          ballRunning
        }
      }
    }
  }
}
    `;

/**
 * __useGetSportEventsQuery__
 *
 * To run a query within a React component, call `useGetSportEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSportEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSportEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSportEventsQuery(baseOptions: Apollo.QueryHookOptions<GetSportEventsQuery, GetSportEventsQueryVariables> & ({ variables: GetSportEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSportEventsQuery, GetSportEventsQueryVariables>(GetSportEventsDocument, options);
      }
export function useGetSportEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSportEventsQuery, GetSportEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSportEventsQuery, GetSportEventsQueryVariables>(GetSportEventsDocument, options);
        }
export function useGetSportEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSportEventsQuery, GetSportEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSportEventsQuery, GetSportEventsQueryVariables>(GetSportEventsDocument, options);
        }
export type GetSportEventsQueryHookResult = ReturnType<typeof useGetSportEventsQuery>;
export type GetSportEventsLazyQueryHookResult = ReturnType<typeof useGetSportEventsLazyQuery>;
export type GetSportEventsSuspenseQueryHookResult = ReturnType<typeof useGetSportEventsSuspenseQuery>;
export type GetSportEventsQueryResult = Apollo.QueryResult<GetSportEventsQuery, GetSportEventsQueryVariables>;
export const UnMatchedBetsDocument = gql`
    query UnMatchedBets {
  unMatchedBets {
    _id
    betType
    createdAt
    eventId
    eventName
    loss
    odds
    profit
    runnerName
    stake
  }
}
    `;

/**
 * __useUnMatchedBetsQuery__
 *
 * To run a query within a React component, call `useUnMatchedBetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnMatchedBetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnMatchedBetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnMatchedBetsQuery(baseOptions?: Apollo.QueryHookOptions<UnMatchedBetsQuery, UnMatchedBetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnMatchedBetsQuery, UnMatchedBetsQueryVariables>(UnMatchedBetsDocument, options);
      }
export function useUnMatchedBetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnMatchedBetsQuery, UnMatchedBetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnMatchedBetsQuery, UnMatchedBetsQueryVariables>(UnMatchedBetsDocument, options);
        }
export function useUnMatchedBetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UnMatchedBetsQuery, UnMatchedBetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UnMatchedBetsQuery, UnMatchedBetsQueryVariables>(UnMatchedBetsDocument, options);
        }
export type UnMatchedBetsQueryHookResult = ReturnType<typeof useUnMatchedBetsQuery>;
export type UnMatchedBetsLazyQueryHookResult = ReturnType<typeof useUnMatchedBetsLazyQuery>;
export type UnMatchedBetsSuspenseQueryHookResult = ReturnType<typeof useUnMatchedBetsSuspenseQuery>;
export type UnMatchedBetsQueryResult = Apollo.QueryResult<UnMatchedBetsQuery, UnMatchedBetsQueryVariables>;
export const InPlayDocument = gql`
    query InPlay {
  inPlay {
    cricket {
      id
      sportId
      eventId
      competitionName
      competitionId
      name
      openDate
      minLimit
      maxLimit
      betDelay
      market {
        marketId
        marketName
        runners {
          selectionId
          runnerName
          status
          back {
            price
            size
          }
          lay {
            price
            size
          }
        }
      }
    }
    football {
      id
      sportId
      eventId
      competitionName
      competitionId
      name
      openDate
      minLimit
      maxLimit
      betDelay
      market {
        marketId
        marketName
        runners {
          selectionId
          runnerName
          status
          back {
            price
            size
          }
          lay {
            price
            size
          }
        }
      }
    }
    tennis {
      id
      sportId
      eventId
      competitionName
      competitionId
      name
      openDate
      minLimit
      maxLimit
      betDelay
      market {
        marketId
        marketName
        runners {
          selectionId
          runnerName
          status
          back {
            price
            size
          }
          lay {
            price
            size
          }
        }
      }
    }
  }
}
    `;

/**
 * __useInPlayQuery__
 *
 * To run a query within a React component, call `useInPlayQuery` and pass it any options that fit your needs.
 * When your component renders, `useInPlayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInPlayQuery({
 *   variables: {
 *   },
 * });
 */
export function useInPlayQuery(baseOptions?: Apollo.QueryHookOptions<InPlayQuery, InPlayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InPlayQuery, InPlayQueryVariables>(InPlayDocument, options);
      }
export function useInPlayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InPlayQuery, InPlayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InPlayQuery, InPlayQueryVariables>(InPlayDocument, options);
        }
export function useInPlaySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InPlayQuery, InPlayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InPlayQuery, InPlayQueryVariables>(InPlayDocument, options);
        }
export type InPlayQueryHookResult = ReturnType<typeof useInPlayQuery>;
export type InPlayLazyQueryHookResult = ReturnType<typeof useInPlayLazyQuery>;
export type InPlaySuspenseQueryHookResult = ReturnType<typeof useInPlaySuspenseQuery>;
export type InPlayQueryResult = Apollo.QueryResult<InPlayQuery, InPlayQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    userName
    status
    role
    availableCredit
    exposure
    creditLimit
    transferStatus
    bettingStatus
    stakes
    loginStep
    createdAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const OpenBetsDocument = gql`
    query OpenBets($input: BetEnumType) {
  openBets(input: $input) {
    _id
    userId
    eventId
    sportId
    eventName
    marketId
    selectionId
    runnerName
    bettingType
    odds
    stake
    betType
    settled
    win
    profit
    loss
    createdAt
    run
  }
}
    `;

/**
 * __useOpenBetsQuery__
 *
 * To run a query within a React component, call `useOpenBetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpenBetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpenBetsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOpenBetsQuery(baseOptions?: Apollo.QueryHookOptions<OpenBetsQuery, OpenBetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpenBetsQuery, OpenBetsQueryVariables>(OpenBetsDocument, options);
      }
export function useOpenBetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpenBetsQuery, OpenBetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpenBetsQuery, OpenBetsQueryVariables>(OpenBetsDocument, options);
        }
export function useOpenBetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OpenBetsQuery, OpenBetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpenBetsQuery, OpenBetsQueryVariables>(OpenBetsDocument, options);
        }
export type OpenBetsQueryHookResult = ReturnType<typeof useOpenBetsQuery>;
export type OpenBetsLazyQueryHookResult = ReturnType<typeof useOpenBetsLazyQuery>;
export type OpenBetsSuspenseQueryHookResult = ReturnType<typeof useOpenBetsSuspenseQuery>;
export type OpenBetsQueryResult = Apollo.QueryResult<OpenBetsQuery, OpenBetsQueryVariables>;
export const BetDocument = gql`
    subscription Bet {
  betSettleSub
}
    `;

/**
 * __useBetSubscription__
 *
 * To run a query within a React component, call `useBetSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBetSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBetSubscription({
 *   variables: {
 *   },
 * });
 */
export function useBetSubscription(baseOptions?: Apollo.SubscriptionHookOptions<BetSubscription, BetSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<BetSubscription, BetSubscriptionVariables>(BetDocument, options);
      }
export type BetSubscriptionHookResult = ReturnType<typeof useBetSubscription>;
export type BetSubscriptionResult = Apollo.SubscriptionResult<BetSubscription>;
export const PlDocument = gql`
    subscription PL {
  plSettleSubscription
}
    `;

/**
 * __usePlSubscription__
 *
 * To run a query within a React component, call `usePlSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePlSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePlSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PlSubscription, PlSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PlSubscription, PlSubscriptionVariables>(PlDocument, options);
      }
export type PlSubscriptionHookResult = ReturnType<typeof usePlSubscription>;
export type PlSubscriptionResult = Apollo.SubscriptionResult<PlSubscription>;