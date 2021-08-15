// import SignUpPage from './SignUpPage.vue';
// import {
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from '@testing-library/vue';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
// import { rest } from 'msw';
// import { capitalize, server, reqBody } from '../helper';

// describe('Sign Up Page', () => {
//   it('has Sign Up Header', () => {
//     render(SignUpPage);
//     const header = screen.queryByRole('heading', { name: 'Sign Up' });
//     expect(header).toBeInTheDocument();
//   });

//   it('has Name input', () => {
//     render(SignUpPage);
//     const input = screen.queryByLabelText('Name:');
//     expect(input).toBeInTheDocument();
//   });

//   it('has Email Input', () => {
//     render(SignUpPage);
//     const input = screen.queryByLabelText('Email:');
//     expect(input).toBeInTheDocument();
//   });

//   it('has password Input', () => {
//     render(SignUpPage);
//     const input = screen.queryByLabelText('Password:');
//     expect(input).toBeInTheDocument();
//   });

//   it('has Password type for password input', () => {
//     render(SignUpPage);
//     const input = screen.queryByLabelText('Password:');
//     expect(input.type).toBe('password');
//   });

//   it('has password repeat input', () => {
//     render(SignUpPage);
//     const input = screen.queryByLabelText('Password Repeat:');
//     expect(input).toBeInTheDocument();
//   });

//   it('has password type for password repeat input', () => {
//     render(SignUpPage);
//     const input = screen.queryByLabelText('Password Repeat:');
//     expect(input.type).toBe('password');
//   });

//   it('has Sign Up Button', () => {
//     render(SignUpPage);
//     const button = screen.queryByRole('button', { name: 'Sign Up' });
//     expect(button).toBeInTheDocument();
//   });

//   it('disables the button initially', () => {
//     render(SignUpPage);
//     const button = screen.queryByRole('button', { name: 'Sign Up' });
//     expect(button).toBeDisabled();
//   });
// });

// describe('interactions', () => {
//   const name = 'user01';
//   const email = '01@test.io';
//   const password = '1234';
//   let button;

//   beforeAll(() => {
//     server.listen();
//   });

//   afterAll(() => {
//     server.close();
//   });

//   const setup = async () => {
//     render(SignUpPage);
//     const nameInput = screen.queryByLabelText('Name:');
//     const emailInput = screen.queryByLabelText('Email:');
//     const passwordInput = screen.queryByLabelText('Password:');
//     const passwordRepeatInput = screen.queryByLabelText('Password Repeat:');
//     await userEvent.type(nameInput, name);
//     await userEvent.type(emailInput, email);
//     await userEvent.type(passwordInput, password);
//     await userEvent.type(passwordRepeatInput, password);
//     button = screen.queryByRole('button', { name: 'Sign Up' });
//   };

//   it('enables the button when password and password-repeat are filled with the same value', async () => {
//     await setup();
//     expect(button).toBeEnabled();
//   });

//   it('sends form data to the backend', async () => {
//     await setup();

//     await userEvent.click(button);
//     await screen.findByTestId('spinner');
//     await screen.findByRole('button', { name: 'Sign Up' });
//     expect(reqBody).toEqual({
//       name: name,
//       email: email,
//       password: password,
//       password_repeat: password,
//     });
//   });

//   it('hides Sign up button during ongoing API call', async () => {
//     await setup();
//     await userEvent.click(button);
//     expect(button).not.toBeInTheDocument();
//   });

//   it('shows a spinner during ongoing API call', async () => {
//     await setup();
//     await userEvent.click(button);
//     const spinner = screen.queryByTestId('spinner');
//     expect(spinner).toBeInTheDocument();
//   });

//   it('does not show a spinner before API call', async () => {
//     await setup();
//     const spinner = screen.queryByTestId('spinner');
//     expect(spinner).not.toBeInTheDocument();
//   });

//   it('does not show spinner after API call', async () => {
//     await setup();
//     await userEvent.click(button);
//     const spinner = screen.queryByTestId('spinner');
//     await waitForElementToBeRemoved(spinner);
//     expect(spinner).not.toBeInTheDocument();
//   });

//   it('shows a Sign Up button after API call', async () => {
//     await setup();
//     await userEvent.click(button);
//     const buttonAfter = await screen.findByRole('button', { name: 'Sign Up' });
//     expect(buttonAfter).toBeInTheDocument();
//   });

//   it('hides a spinner if API call fails', async () => {
//     server.use(
//       rest.post('/api/register', (req, res, ctx) => {
//         return res.once(ctx.status(400));
//       })
//     );
//     await setup();
//     await userEvent.click(button);
//     await screen.findByTestId('spinner');
//     const buttonAfer = await screen.findByRole('button', { name: 'Sign Up' });
//     expect(buttonAfer).toBeInTheDocument();
//   });
// });

// describe('validation', () => {
//   it('should show alert when the length of name is more than 12', async () => {
//     render(SignUpPage);
//     const nameInput = screen.queryByLabelText('Name:');
//     await userEvent.type(nameInput, 'aaaaaaaaaaaaa');
//     const message = screen.queryByText('名前は12字以内です');
//     expect(message).toBeInTheDocument();
//   });
//   it('should not show alert when the length of name is less or equal to 12', async () => {
//     render(SignUpPage);
//     const nameInput = screen.queryByLabelText('Name:');
//     await userEvent.type(nameInput, 'aaaaaaaaaaaa');
//     const message = screen.queryByText('名前は12字以内です');
//     expect(message).not.toBeInTheDocument();
//   });
//   it('should show alert when the password and password repeat are different', async () => {
//     render(SignUpPage);
//     const passwordInput = screen.queryByLabelText('Password:');
//     const passwordRepeatInput = screen.queryByLabelText('Password Repeat:');
//     await userEvent.type(passwordInput, 'aaaa');
//     await userEvent.type(passwordRepeatInput, 'bbbb');
//     const message = screen.queryByText('パスワードと違います');
//     expect(message).toBeInTheDocument();
//   });

//   it('should not show alert when the password and password repeat are the same', async () => {
//     render(SignUpPage);
//     const passwordInput = screen.queryByLabelText('Password:');
//     const passwordRepeatInput = screen.queryByLabelText('Password Repeat:');
//     await userEvent.type(passwordInput, 'aaaa');
//     await userEvent.type(passwordRepeatInput, 'aaaa');
//     const message = screen.queryByText('パスワードと違います');
//     expect(message).not.toBeInTheDocument();
//   });

//   it('should show alert when an improper email is input', async () => {
//     render(SignUpPage);
//     const passwordInput = screen.queryByLabelText('Email:');
//     await userEvent.type(passwordInput, 'aaaatest.io');
//     const message = screen.queryByText('正しいメールアドレスを入力して下さい');
//     expect(message).toBeInTheDocument();
//   });

//   it('should not show alert when a proper email is input', async () => {
//     render(SignUpPage);
//     const passwordInput = screen.queryByLabelText('Email:');
//     await userEvent.type(passwordInput, 'aaaa@test.io');
//     const message = screen.queryByText('正しいメールアドレスを入力して下さい');
//     expect(message).not.toBeInTheDocument();
//   });

//   it.each`
//     eng                  | jap
//     ${`name`}            | ${`名前`}
//     ${`email`}           | ${`メールアドレス`}
//     ${`password`}        | ${`パスワード`}
//     ${`password-repeat`} | ${`パスワード確認`}
//   `("should show alert when $eng isn't filled in", async (params) => {
//     const { eng, jap } = params;
//     render(SignUpPage);
//     const nameInput = screen.queryByLabelText('Name:');
//     const emailInput = screen.queryByLabelText('Email:');
//     const passwordInput = screen.queryByLabelText('Password:');
//     const passwordRepeatInput = screen.queryByLabelText('Password Repeat:');
//     await userEvent.type(nameInput, '01');
//     await userEvent.type(emailInput, '01@test.io');
//     await userEvent.type(passwordInput, '1234');
//     await userEvent.type(passwordRepeatInput, '1234');

//     const inputToBlank = screen.queryByLabelText(`${capitalize(eng)}:`);
//     await userEvent.clear(inputToBlank);

//     const message = await screen.findByText(`${jap}が未入力です`, {
//       exact: false,
//     });
//     expect(message).toBeInTheDocument();
//   });
// });
