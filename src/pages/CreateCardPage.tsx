import { useContext, useId, useState } from "react";
import { CardsContext } from "../App";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const FormWrapper = styled.div`
    position: relative;
    height: 70vh;
    width: 70%;
    .form-enter {
        transform: translateX(100%);
        opacity: 0;
    }
    .form-enter-active {
        transform: translateX(0);
        opacity: 1;
        transition: transform 300ms, opacity 300ms;
    }
    .form-exit {
        transform: translateX(0);
        opacity: 1;
    }
    .form-exit-active {
        transform: translateX(-100%);
        opacity: 0;
        transition: transform 300ms, opacity 300ms;
    }
`;

const Notification = styled.div<{success: boolean}>`
  margin-bottom: 20px;
  background-color: ${props => (props.success ? '#11999e' : '#f6416c')};
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  &.notification-enter {
    opacity: 0;
  }
    &.notification-enter-active {
      opacity: 1;
      transition: opacity 1000ms;
    }
  &.notification-exit {
    opacity: 1;
  }
  &.notification-exit-active {
    opacity: 0;
    transition: opacity 1000ms;
  }
`;

const Form = ({question, answer, addCard, fillQuestion, fillAnswer, id}) => (
    <div className="card">
        <form className="create-card-form" onSubmit={addCard}>
            <label htmlFor={id + "-question-textarea"}></label>
            <textarea 
            className="form-textarea question-textarea"
            data-testid="question-textarea" 
            id={id + "-question-textarea"} 
            placeholder="Put your question here" 
            name="question"
            autoFocus={true}
            value={question}
            onChange={fillQuestion}
            />
            <hr />
            <label htmlFor={id + "-answer-textarea"}></label>
            <textarea 
            className="form-textarea answer-textarea"
            data-testid="answer-textarea"
            id={id + "-answer-textarea"}
            placeholder="Put your answer here"
            name="answer"
            value={answer}
            onChange={fillAnswer}
            />
            <div className="card-footer">
                <button className="btn btn-primary card-btn">Create</button>
            </div>
        </form>
    </div>
)

export default function CreateCardPage() {

    const id = useId();
    const { cards, setCards } = useContext(CardsContext);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [currentForm, setCurrentForm] = useState(0);
    const [notification, setNotification] = useState<{ message: string; success: boolean } | null>(null);

    function fillQuestion(event: React.SyntheticEvent<HTMLTextAreaElement>) {
        setQuestion(event.currentTarget.value);
    }

    function fillAnswer(event: React.SyntheticEvent<HTMLTextAreaElement>) {
        setAnswer(event.currentTarget.value);
    }

    function addCard(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!question || !answer) {
            setNotification({ message: 'Fields cannot be empty', success: false });
        } else {
            setCards([...cards, 
                { 
                question: question,
                answer: answer
                }
            ]);
            setNotification({ message: 'Form submitted successfully', success: true });
            setCurrentForm(prev => prev + 1);
            setQuestion("");
            setAnswer("");
        }
        setTimeout(() => setNotification(null), 1000);
    }

    const forms = [
        <Form
        key="form1"
        question={question}
        answer={answer}
        addCard={addCard}
        fillQuestion={fillQuestion}
        fillAnswer={fillAnswer}
        id={id}
        />,
        <Form
        key="form2"
        question={question}
        answer={answer}
        addCard={addCard}
        fillQuestion={fillQuestion}
        fillAnswer={fillAnswer}
        id={id}
        />
    ];
    
    return (
        <div className="card-page">
            <div className="create-card-notification">
                <TransitionGroup>
                    {notification && (
                        <CSSTransition key="notification" timeout={2000} classNames="notification">
                            <Notification success={notification.success}>
                                {notification.message}
                            </Notification>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
            
            <FormWrapper>
                <TransitionGroup>
                    <CSSTransition key={currentForm} timeout={300} classNames="form">
                        {forms[currentForm % forms.length]}
                    </CSSTransition>
                </TransitionGroup>
            </FormWrapper>
        </div>
    );
}