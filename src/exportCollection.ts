import * as fs from 'fs';
import { Db } from 'mongodb';
import { parse } from './parse';

export interface ICollectionConfig {
  collection: string;
  exportUsing: {
    method: string;
    query: any;
  };
}

export const exportCollection = (db: Db) => async (collection: string | ICollectionConfig) => {
  let col: string;
  let method: string;
  let query: any = {};

  if (typeof collection === 'string') {
    col = collection;
    method = 'find';
  } else {
    col = collection.collection;
    method = collection.exportUsing.method;
    query = collection.exportUsing.query;
  }

  const cursor = db.collection(col)[method](query);
  const documents: any[] = [];
  while (await cursor.hasNext()) {
    const document = await cursor.next();
    documents.push(document);
  }

  const path = `${collection}.csv`;
  fs.writeFileSync(path, await parse(documents));
  console.log(`wrote ${path}`);
};
