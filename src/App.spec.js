import App from './App.vue';
import LoginPage from './pages/LoginPage.vue';
import { findByTestId, render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import router from './router';
import { server, userData } from './helper';
import store from './store';

beforeAll(() => server.listen());
// beforeEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
});

const setup = async (path) => {
  render(App, {
    global: { plugins: [store, router] },
  });
  router.replace(path);
  await router.isReady();
};
describe('Routing', () => {
  // it.each`
  //   path         | PageTestId
  //   ${`/`}       | ${`home-page`}
  //   ${`/signup`} | ${`signup-page`}
  //   ${`/login`}  | ${`login-page`}
  //   ${`/user`}   | ${`users-page`}
  //   ${`/user/1`} | ${`user-page`}
  //   ${`/user/2`} | ${`user-page`}
  // `('should show $PageTestId in $path', async (params) => {
  //   const { path, PageTestId } = params;
  //   await setup(path);
  //   const page = screen.queryByTestId(PageTestId);
  //   expect(page).toBeInTheDocument();
  // });
  // it.each`
  //   path         | PageTestId
  //   ${`/`}       | ${`signup-page`}
  //   ${`/`}       | ${`login-page`}
  //   ${`/`}       | ${`user-page`}
  //   ${`/signup`} | ${`home-page`}
  //   ${`/signup`} | ${`login-page`}
  //   ${`/signup`} | ${`user-page`}
  //   ${`/login`}  | ${`home-page`}
  //   ${`/login`}  | ${`signup-page`}
  //   ${`/login`}  | ${`user-page`}
  //   ${`/user`}   | ${`home-page`}
  //   ${`/user`}   | ${`signup-page`}
  //   ${`/user`}   | ${`login-page`}
  // `('should not show $PageTestId in $path', async (params) => {
  //   const { path, PageTestId } = params;
  //   await setup(path);
  //   const page = screen.queryByTestId(PageTestId);
  //   expect(page).not.toBeInTheDocument();
  // });
  // it.each`
  //   pageId           | linkTo
  //   ${`home-page`}   | ${`Home`}
  //   ${`users-page`}  | ${`User`}
  //   ${`signup-page`} | ${`Signup`}
  //   ${`login-page`}  | ${`Login`}
  // `('displays $linkTo page after clicking $linkTo link', async (params) => {
  //   const { pageId, linkTo } = params;
  //   await setup('/');
  //   const link = screen.queryByRole('link', {
  //     name: linkTo,
  //   });
  //   await userEvent.click(link);
  //   const page = await screen.findByTestId(pageId);
  //   expect(page).toBeInTheDocument();
  // });
});

describe('Login', () => {
  afterEach(() => store.dispatch('discardUser'));
  it('should display Users Page after successfully logged in', async () => {
    await setup('/login');
    const emailInput = screen.queryByLabelText('Email:');
    const passwordInput = screen.queryByLabelText('Password:');
    await userEvent.type(emailInput, '01@test.io');
    await userEvent.type(passwordInput, '1234');
    const button = screen.queryByRole('button', { name: 'Login' });
    await userEvent.click(button);
    const page = await screen.findByTestId('users-page');
    expect(page).toBeInTheDocument();
  });
  it('should display Profile link after successfully logged in', async () => {
    await setup('/login');
    const emailInput = screen.queryByLabelText('Email:');
    const passwordInput = screen.queryByLabelText('Password:');
    await userEvent.type(emailInput, '01@test.io');
    await userEvent.type(passwordInput, '1234');
    const button = screen.queryByRole('button', { name: 'Login' });
    await userEvent.click(button);
    const link = await screen.findByRole('link', {
      name: userData.name,
    });
    expect(link).toBeInTheDocument();
  });
  // it('should not display Signup link after successfully logged in', async () => {
  //   await setup('/login');
  //   const emailInput = screen.queryByLabelText('Email:');
  //   const passwordInput = screen.queryByLabelText('Password:');
  //   await userEvent.type(emailInput, '01@test.io');
  //   await userEvent.type(passwordInput, '1234');
  //   const button = screen.queryByRole('button', { name: 'Login' });
  //   await userEvent.click(button);
  //   const link = await screen.findByRole('link', {
  //     name: 'Signup',
  //   });
  //   expect(link).not.toBeInTheDocument();
  // });
  // it('should not display Login link after successfully logged in', async () => {
  //   await setup('/login');
  //   const emailInput = screen.queryByLabelText('Email:');
  //   const passwordInput = screen.queryByLabelText('Password:');
  //   await userEvent.type(emailInput, '01@test.io');
  //   await userEvent.type(passwordInput, '1234');
  //   const button = screen.queryByRole('button', { name: 'Login' });
  //   await userEvent.click(button);
  //   const link = await screen.findByRole('link', {
  //     name: 'Login',
  //   });
  //   expect(link).not.toBeInTheDocument();
  // });
});
