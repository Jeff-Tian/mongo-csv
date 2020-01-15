import jsonexport from 'jsonexport/dist';

export const parse = async (json: any[]) => {
  return await new Promise((resolve, reject) => {
    jsonexport(json, (err, csv) => {
      if (err) {
        reject(err);
      } else {
        resolve('\ufeff' + csv);
      }
    });
  });
};
