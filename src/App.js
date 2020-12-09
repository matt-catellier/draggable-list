import React from 'react'
import { VariableSizeList } from "react-window"
import logo from './logo.svg';
import './App.css';
import { LoremIpsum } from "lorem-ipsum"
import List from './List'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const App = () => {
  const [items, setItems] = React.useState([])
  const [numberOfItems, setNumberOfItems] = React.useState('')

  const handleChangeNumberOfItems = (e) => {
    setNumberOfItems(e.target.value)
  }
  const handleGenerate = () => {
    let newItems = Array.from({length: numberOfItems}, () => lorem.generateSentences(Math.floor(Math.random() * 4) + 2 ))
    setItems([...items, ...newItems])
  }

  console.log(items)

  return (
    <div className="App">
      <header className="App-header">
        <input id="number-of-items" type="number"  placeholder="# of items" value={numberOfItems} onChange={handleChangeNumberOfItems} />
        <button onClick={handleGenerate}>generate</button>
        <button>reset</button>
      </header>
      <List items={items} />
    </div>
  );
}

export default App;
