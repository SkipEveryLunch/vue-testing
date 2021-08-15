import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const capitalize = (letter) => {
  let result;
  if (!letter.includes('-')) {
    result = letter.charAt(0).toUpperCase() + letter.slice(1);
  } else {
    result = letter
      .split('-')
      .map((el) => {
        return el.charAt(0).toUpperCase() + el.slice(1);
      })
      .join(' ');
  }
  return result;
};
export let reqBody;
export const server = setupServer(
  rest.post('/api/register', (req, res, ctx) => {
    reqBody = req.body;
    return res(ctx.status(200));
  }),
  rest.post('/api/login', (req, res, ctx) => {
    reqBody = req.body;
    return res(ctx.status(200), ctx.cookie('token', '12345'));
  }),
  rest.get('/api/users', (req, res, ctx) => {
    reqBody = req.body;
    return res(ctx.status(200), ctx.json(usersData));
  }),
  rest.get('/api/currentUser', (req, res, ctx) => {
    const { token } = req.cookies;
    if (token === '12345') {
      return res(ctx.status(200), ctx.json(userData));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'user not found' }));
    }
  })
);
export const usersData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'js@test.io',
  },
  {
    id: 2,
    name: 'Tom Smith',
    email: 'ts@test.io',
  },
  {
    id: 3,
    name: 'Agnis Smith',
    email: 'as@test.io',
  },
  {
    id: 4,
    name: 'Philip Smith',
    email: 'ps@test.io',
  },
];
export const userData = usersData[0];
