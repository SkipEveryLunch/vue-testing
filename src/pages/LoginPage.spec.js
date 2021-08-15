// import LoginPage from './LoginPage.vue';
// import {
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from '@testing-library/vue';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
// import { capitalize, server, reqBody } from '../helper';
// import { rest } from 'msw';
// import router from '../router';

// const email = '01@test.io';
// const password = '1234';
// let button;
// let emailInput;
// let passwordInput;
// const setup = async () => {
//   render(LoginPage, {
//     global: { plugins: [router] },
//   });
//   emailInput = screen.queryByLabelText('Email:');
//   passwordInput = screen.queryByLabelText('Password:');
//   await userEvent.type(emailInput, email);
//   await userEvent.type(passwordInput, password);
//   button = screen.queryByRole('button', { name: 'Login' });
// };

// describe('Log in Page', () => {
//   describe('Layout', () => {
//     it('has Login Header', () => {
//       render(LoginPage, {
//         global: { plugins: [router] },
//       });
//       const header = screen.queryByRole('heading', { name: 'Login' });
//       expect(header).toBeInTheDocument();
//     });
//     it('has Email Input', () => {
//       render(LoginPage, {
//         global: { plugins: [router] },
//       });
//       const input = screen.queryByLabelText('Email:');
//       expect(input).toBeInTheDocument();
//     });
//     it('has password Input', () => {
//       render(LoginPage, {
//         global: { plugins: [router] },
//       });
//       const input = screen.queryByLabelText('Password:');
//       expect(input).toBeInTheDocument();
//     });
//     it('has Password type for password input', () => {
//       render(LoginPage, {
//         global: { plugins: [router] },
//       });
//       const input = screen.queryByLabelText('Password:');
//       expect(input.type).toBe('password');
//     });
//     it('has Login Button', () => {
//       render(LoginPage, {
//         global: { plugins: [router] },
//       });
//       const button = screen.queryByRole('button', { name: 'Login' });
//       expect(button).toBeInTheDocument();
//     });
//     it('has Login disabled', () => {
//       render(LoginPage, {
//         global: { plugins: [router] },
//       });
//       const button = screen.queryByRole('button', { name: 'Login' });
//       expect(button).toBeDisabled();
//     });
//   });
//   describe('Interaction', () => {
//     it('should enable the button when email and password are filled', async () => {
//       await setup();
//       expect(button).toBeEnabled();
//     });
//     it.each`
//       input
//       ${`email`}
//       ${`password`}
//     `(
//       "should not enable the button when $input isn't filled",
//       async (params) => {
//         const { input } = params;
//         await setup();
//         const target = screen.queryByLabelText(`${capitalize(input)}:`);
//         await userEvent.clear(target);
//         expect(button).not.toBeEnabled();
//       }
//     );
//     it('shold not enable the button when email is improper', async () => {
//       await setup();
//       userEvent.clear(emailInput);
//       await userEvent.type(emailInput, '01test.io');
//       expect(button).not.toBeEnabled();
//     });
//   });
//   describe('API call', () => {
//     beforeAll(() => {
//       server.listen();
//     });
//     afterAll(() => {
//       server.close();
//     });
//     it('sends form data to the backend', async () => {
//       await setup();
//       await userEvent.click(button);
//       await screen.findByTestId('spinner');
//       await screen.findByRole('button', { name: 'Login' });
//       expect(reqBody).toEqual({
//         email: email,
//         password: password,
//       });
//     });
//     it('hides Login button during ongoing API call', async () => {
//       await setup();
//       await userEvent.click(button);
//       expect(button).not.toBeInTheDocument();
//     });

//     it('shows a spinner during ongoing API call', async () => {
//       await setup();
//       await userEvent.click(button);
//       const spinner = screen.queryByTestId('spinner');
//       expect(spinner).toBeInTheDocument();
//     });

//     it('does not show a spinner before API call', async () => {
//       await setup();
//       const spinner = screen.queryByTestId('spinner');
//       expect(spinner).not.toBeInTheDocument();
//     });

//     it('does not show spinner after API call', async () => {
//       await setup();
//       await userEvent.click(button);
//       const spinner = screen.queryByTestId('spinner');
//       await waitForElementToBeRemoved(spinner);
//       expect(spinner).not.toBeInTheDocument();
//     });

//     it('shows a Login button after API call', async () => {
//       await setup();
//       await userEvent.click(button);
//       const buttonAfter = await screen.findByRole('button', { name: 'Login' });
//       expect(buttonAfter).toBeInTheDocument();
//     });

//     it('hides a spinner if API call fails', async () => {
//       server.use(
//         rest.post('/api/login', (req, res, ctx) => {
//           return res.once(ctx.status(400));
//         })
//       );
//       await setup();
//       await userEvent.click(button);
//       await screen.findByTestId('spinner');
//       const buttonAfer = await screen.findByRole('button', { name: 'Login' });
//       expect(buttonAfer).toBeInTheDocument();
//     });
//   });
// });
