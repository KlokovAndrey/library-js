import { Hits } from './Hits';


export interface Found {
  took: {
    took: any,
timed_out:any
  },
shards: {
  total: any, 
  successful: any, 
  skipped: any, 
  failed: any
},
hits: {
  total: {
    value: any,
    relation: any
  }, 
  max_score: any
  hits: Hits[],
  highlight: {
    Text: string[]
  }
  }  
}