import * as fs from 'fs';
import { Db } from 'mongodb';
import { parse } from './parse';

export const exportCollection = (db: Db) => async (collection: string) => {
  const cursor = db.collection(collection).find({});
  const documents: any[] = [];
  while (await cursor.hasNext()) {
    const document = await cursor.next();
    documents.push(document);
  }

  let path = `${collection}.csv`;
  fs.writeFileSync(path, await parse(documents));
  console.log(`wrote ${path}`);
};
