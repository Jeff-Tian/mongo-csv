import { parse } from '../parse';

test('parser', async () => {
  const contacts = [
    {
      name: 'Bob',
      lastname: 'Smith',
    },
    {
      name: 'James',
      lastname: 'David',
    },
    {
      name: 'Robert',
      lastname: 'Miller',
    },
    {
      name: 'David',
      lastname: 'Martin',
    },
  ];

  const res = await parse(contacts);
  expect(res).toEqual(`name,lastname
Bob,Smith
James,David
Robert,Miller
David,Martin`);
});
