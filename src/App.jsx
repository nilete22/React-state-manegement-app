import { useState } from "react";
import { StatisticLine} from "./Statistics.jsx";
import { Button } from "./Button.jsx";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = (good + neutral + bad);
  const average = (good - bad) / all;
  const positive = (good * 100) / all;

  const handleGoodIncrement = () => {
    setGood((prevTotal) => prevTotal + 1);
  }
  const handleNeutralIncrement = () => {
    setNeutral((prevTotal) => prevTotal + 1);
  }
  const handleBadIncrement = () => {
    setBad((prevTotal) => prevTotal + 1);
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [anecdote, setText] = useState(anecdotes[0]);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleAnecdoteSelect = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelected);
    setText(anecdotes[newSelected]);
  }

  const handleAnecdoteVote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  }

  const maxVotes = Math.max(...votes);
  const maxIndices = votes.reduce((acc, vote, index) => {
    if (vote === maxVotes) {
      acc.push(index);
    }
    return acc;
  }, []);

  return (
    <div>
      <h1>give feedback</h1>

      <Button handler={handleGoodIncrement} text="Good"/>
      <Button handler={handleNeutralIncrement} text="Neutral"/>
      <Button handler={handleBadIncrement} text="Bad"/>

      <h2>statistics</h2>
      {all > 0 && (
        <ul>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive + "%"}/>
        </ul>
      )}

      <h1>anecdotes</h1>
        <p>{anecdote}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={handleAnecdoteVote}>vote</button>
        <button onClick={handleAnecdoteSelect}>next anecdote</button>

        <h1>Anecdote with the most votes</h1>
        <p>{anecdotes[maxIndices[0]]}</p>
        <p>has {maxVotes} votes</p>
    </div>
  );
};

export default App;
