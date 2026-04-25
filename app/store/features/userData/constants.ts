export const USER_DATA_FEATURE_KEY = 'userData';

export type TDenomination =
  | 'Catholic'
  | 'Protestant'
  | 'Baptist'
  | 'Nondenominational'
  | 'Methodist'
  | 'Pentecostal'
  | 'Lutheran'
  | 'Evangelical'
  | 'Adventist'
  | 'Orthodox'
  | 'Other';

export type TBibleVersion =
  | 'Revised Standart Version Catholic Edition'
  | 'New International Version (Anglicised) '
  | 'New King James Version'
  | 'Amplifield'
  | 'New American Standart Bible'
  | 'King James (Authorised) Version'
  | 'World Messianic Bible'
  | 'Free Bible Version'
  | "World English Bible, American English Edition, without Strong's Numbers"
  | 'The Passion Translation'
  | 'Nueva Versión Internacional(ES)'
  | 'Die Bibel'
  | 'La Parola è Vita'
  | 'Nova Versão Internacional(PT)'
  | 'La Bible du Semeur'
  | 'Noua Traducere Românească'
  | 'Ang Salita ng Dios'
  | 'Het Boek'
  | 'Reina-Valera';

export type TAgeGroup = '13-17' | '18-24' | '25-34' | '35-44' | '45+';

export type TGender = 'Male' | 'Female';

export type TStruggle =
  | 'Anxiety or fear'
  | 'Loneliness or heartbreak'
  | 'Doubt or uncertainty'
  | 'Relationships or conflict'
  | 'Stress or burnout'
  | 'Lack of motivation or hope'
  | 'Health or healing'
  | 'Finances or provision'
  | 'Other';

export interface IUserData {
  id: string;
  allowTrackActivity: boolean;
  allowSendNotification: boolean;
  denomination: TDenomination;
  bibleVersion: TBibleVersion;
  ageGroup: TAgeGroup;
  gender: TGender;
  struggle: TStruggle;
  facingMessage: string;
  paymentMethod: 'not now' | 'restore' | 'weekly' | 'yearly';
  isPro: boolean;
  lastPaymentDate: Date | null;
  subscriptionStatus: 'active' | 'expired' | 'none';
}

export type TUserDataStatus = 'idle' | 'loaded';

export interface IDailyVerse {
  verse: string;
  acts: string;
}

export interface IUserDataState {
  userData: Partial<IUserData>;
  status: TUserDataStatus;
  dailyVerse: IDailyVerse | null;
  docId: string | null;
}
