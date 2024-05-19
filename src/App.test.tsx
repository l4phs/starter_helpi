import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import BQPage from './Pages/BQPage';
import DQPage from './Pages/DQPage';
import ResultPage from './Pages/ResultPage';
import userEvent from '@testing-library/user-event';

test('Home Page title "Jobspresso" loads', () => {
  render(<App />);
  const linkElement = screen.getByText(/Jobspresso/i);
  expect(linkElement).toBeInTheDocument();
}); 

test('BQPage loads', () => {
  render(<BQPage setPage={function (page: string): void {
    throw new Error('Function not implemented.');
  } } apiKey={''} setGptReport={function (report: string): void {
    throw new Error('Function not implemented.');
  } } />);
  const textElement = screen.getByTestId('BQtitle');
  expect (textElement).toBeInTheDocument()
});

test('DQPage loads', () => {
  render(<DQPage setPage={function (page: string): void {
    throw new Error('Function not implemented.');
  } } apiKey={''} setGptReport={function (report: string): void {
    throw new Error('Function not implemented.');
  } } />);
  const textElement = screen.getByTestId('DQtitle');
  expect (textElement).toBeInTheDocument()
});

test('Results Page loads', () => {
  render(<ResultPage gptReport={''} setPage={function (page: string): void {
    throw new Error('Function not implemented.');
  } } />);
  const textElement = screen.getByTestId('Results Page Header');
  expect (textElement).toBeInTheDocument()
});

//Test written with the assistance of ChatGPT to check if the radio buttons for the first question on the BQPage are correctly checked and 
//not checked depending on what the user selects.
test('The radio buttons in the BQPage correctly work', () => {
  render(<BQPage setPage={function (page: string): void {
    throw new Error('Function not implemented.');
  } } apiKey={''} setGptReport={function (report: string): void {
    throw new Error('Function not implemented.');
  } } />);
  
  const answer1 = screen.getByTestId('Working from home');
  const answer2 = screen.getByTestId('Hybrid');

  expect(answer1).not.toBeChecked();
  expect(answer2).not.toBeChecked();

  userEvent.click(answer1);
  expect(answer1).toBeChecked();
  expect(answer2).not.toBeChecked();

  userEvent.click(answer2);
  expect(answer1).not.toBeChecked();
  expect(answer2).toBeChecked();
});

//Test written with the assistance of ChatGPT to check if a user is able to input an answer into the text 
//box of the first question on the DQ page.
test('The text box in the DQ page works correctly', () => {
  render(<DQPage setPage={function (page: string): void {
    throw new Error('Function not implemented.');
  } } apiKey={''} setGptReport={function (report: string): void {
    throw new Error('Function not implemented.');
  } } />);
  
  const textArea = screen.getByRole('textbox');

  userEvent.type(textArea, 'This is a test answer.');

  expect(textArea).toHaveValue('This is a test answer.');
})

