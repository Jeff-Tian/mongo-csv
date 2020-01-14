import { Db } from 'mongodb';
import * as fs from 'fs';

export const exportCollection = (db: Db) => async (collection: string) => {
  const cursor = db.collection(collection).find({});
  const documents = [];
  while (await cursor.hasNext()) {
    const document = await cursor.next();
    documents.push(document);
  }

  fs.writeFileSync(`${collection}.json`, documents.join(', \n'));
};
