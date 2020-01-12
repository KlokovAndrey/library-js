import { Source } from './source';

export interface TextById {
    _index: any, 
    _type: any, 
    _id: any, 
    _version: any,
    _seq_no: any,
    _primary_term: any,
    found: any,
    _source: Source
  }