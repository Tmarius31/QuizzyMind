import './App.css';

import Quiz from './Components/Quiz';

import { jsQuizz } from './constants';

function App() {

  return (
    <>
      <Quiz questions={jsQuizz.questions}/>
    </>
  )
}

export default App
