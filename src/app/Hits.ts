export interface Hits {
    _index: any, 
    _type: any, 
    _id: any, 
    _score: any
    _source: {
      Book: string, 
      Chapter: string,
      Text: string
    }
  }