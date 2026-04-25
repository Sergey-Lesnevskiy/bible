import AMP from '../assets/books/AMP.json';
import BDS from '../assets/books/BDS.json';
import FBV from '../assets/books/FBV.json';
import HTB from '../assets/books/HTB.json';
import KJV from '../assets/books/KJV.json';
import NASB from '../assets/books/NASB.json';
import NIV from '../assets/books/NIV.json';
import NKJV from '../assets/books/NKJV.json';
import NTR from '../assets/books/NTR.json';
import NVI_ES from '../assets/books/NVI_ES.json';
import NVI_PT from '../assets/books/NVI_PT.json';
import PEV from '../assets/books/PEV.json';
import RSVCE from '../assets/books/RSVCE.json';
import RVR1960 from '../assets/books/RVR1960.json';
import SCHL from '../assets/books/SCHL.json';
import TCB from '../assets/books/TCB.json';
import TPT from '../assets/books/TPT.json';
import WEBUS from '../assets/books/WEBUS.json';
import WMB from '../assets/books/WMB.json';

import type { BibleJson } from './bibleJson';

export const AVAILABLE_BIBLE_VERSIONS: BibleJson[] = [
  AMP as BibleJson,
  BDS as BibleJson,
  FBV as BibleJson,
  HTB as BibleJson,
  KJV as BibleJson,
  NASB as BibleJson,
  NIV as BibleJson,
  NKJV as BibleJson,
  NTR as BibleJson,
  NVI_ES as BibleJson,
  NVI_PT as BibleJson,
  PEV as BibleJson,
  RSVCE as BibleJson,
  RVR1960 as BibleJson,
  SCHL as BibleJson,
  TCB as BibleJson,
  TPT as BibleJson,
  WEBUS as BibleJson,
  WMB as BibleJson,
];

export const DEFAULT_BIBLE_VERSION_JSON =
  AVAILABLE_BIBLE_VERSIONS[0] as BibleJson;

export const getBibleVersionLabel = (versionJson: BibleJson): string => {
  return versionJson?.version ?? '';
};

const BIBLE_VERSION_NAME_TO_CODE: Record<string, string> = {
  'Revised Standart Version Catholic Edition': 'RSVCE',
  'New International Version (Anglicised)': 'NIV',
  'New King James Version': 'NKJV',
  'Amplified': 'AMP',
  'New American Standart Bible': 'NASB',
  'King James (Authorised) Version': 'KJV',
  'World Messianic Bible': 'WMB',
  'Free Bible Version': 'FBV',
  "World English Bible, American English Edition, without Strong's Numbers": 'WEBUS',
  'The Passion Translation': 'TPT',
  'Nueva Versión Internacional(ES)': 'NVI_ES',
  'Die Bibel': 'SCHL',
  'La Parola è Vita': 'PEV',
  'Nova Versão Internacional(PT)': 'NVI_PT',
  'La Bible du Semeur': 'BDS',
  'Noua Traducere Românească': 'NTR',
  'Ang Salita ng Dios': 'TCB',
  'Het Boek': 'HTB',
  'Reina-Valera': 'RVR1960',
};

export const getBibleJsonByVersionLabel = (label: string): BibleJson | null => {
  if (!label) return null;

  const foundindLabel = label
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const normalizedLabel =
    foundindLabel === 'Amplifield'
      ? 'Amplified'
      : foundindLabel === 'New International Version (Anglicised)'
        ? 'New International Version (Anglicised)'
        : foundindLabel;

  const found = AVAILABLE_BIBLE_VERSIONS.find(
    (v) => getBibleVersionLabel(v) === normalizedLabel,
  );

  if (found) return found;

  const versionCode =
    BIBLE_VERSION_NAME_TO_CODE[normalizedLabel] ??
    BIBLE_VERSION_NAME_TO_CODE['Revised Standart Version Catholic Edition'];

  const foundByName = AVAILABLE_BIBLE_VERSIONS.find(
    (v) => getBibleVersionLabel(v) === versionCode,
  );

  return foundByName ?? null;
};

export const getDefaultBibleVersionByDenomination = (
  denomination?: string,
): string => {
  const denominationMap: Record<string, string> = {
    Catholic: 'RSVCE',
    Protestant: 'NIV',
    Baptist: 'KJV',
    Nondenominational: 'NIV',
    Methodist: 'NKJV',
    Pentecostal: 'NKJV',
    Lutheran: 'NASB',
    Evangelical: 'NIV',
    Orthodox: 'NKJV',
    Adventist: 'NKJV',
  };

  return denominationMap[denomination || ''] || 'NIV';
};
