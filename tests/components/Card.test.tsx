import { it, expect, describe, afterEach, beforeEach, test } from 'vitest';
import { cleanup, render, screen} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import Card from '../../src/components/Card';


describe('Card', () => {
    afterEach(() => {
        cleanup()
    })

    it('renders the question and buttons correctly', () => {
        render(<Card
            question="What is your name?"
            answer="Jane Doe"
            nextCard={() => {}}
            recite={() => {}}
            allCardsDone={false} />)
        
        const question = screen.getByRole('heading')
        const buttons = screen.getAllByRole('button')
        expect(question).toBeInTheDocument
        expect(question).toHaveTextContent(/name/i)
        expect(buttons).toHaveLength(3)
        expect(buttons[0]).toHaveTextContent(/forget/i)
        expect(buttons[1]).toHaveTextContent(/not sure/i)
        expect(buttons[2]).toHaveTextContent(/clear/i)
    });

    it('renders the congrats and recite buttons when all cards are done', () => {
        render(<Card
            nextCard={() => {}}
            recite={() => {}}
            allCardsDone={true} />)
        
        const question = screen.getByText(/Good/i)
        const answer = screen.getByText(/completed/i)
        const buttons = screen.getAllByRole('button')
        expect(question).toBeInTheDocument
        expect(answer).toBeInTheDocument
        expect(buttons).toHaveLength(1)
        expect(buttons[0]).toHaveTextContent(/Recite/i)
    });
})


const buttons = [
    {testid: "forget-button"},
    {testid: "not-sure-button"},
    {testid: "clear-next-button"}
  ];
  
// test showing answer no matter which button is clicked
describe.each(buttons)('clicking on %p', ({ testid }) => {
    beforeEach(() => {
        render(<Card
            question="What is your name?"
            answer="Jane Doe"
            nextCard={() => {}}
            recite={() => {}}
            allCardsDone={false} />);
    });

    test('should render the answer', async () => {
        const button = screen.getByTestId(testid);
        await userEvent.click(button);

        const answer = screen.getByText(/Jane/i);
        expect(answer).toBeInTheDocument();
    });
});
