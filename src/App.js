import React from 'react'
import { VariableSizeList } from "react-window"
import logo from './logo.svg';
import './App.css';
import { LoremIpsum } from "lorem-ipsum"
import List from './List'
import List2 from './List2'
import List3 from './List3'

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

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const App = () => {
  const [items, setItems] = React.useState([])
  const [numberOfItems, setNumberOfItems] = React.useState('')

  const handleChangeNumberOfItems = (e) => {
    setNumberOfItems(e.target.value)
  }
  const handleGenerate = () => { 
    let newItems = Array.from({length: numberOfItems}, () => uuidv4())
      .map(id => ({ id, content: lorem.generateSentences(Math.floor(Math.random() * 4) + 2 ) }))
    setItems(newItems)
  }

  console.log(items)

  return (
    <div className="App">
      <header className="App-header">
        <input id="number-of-items" type="number"  placeholder="# of items" value={numberOfItems} onChange={handleChangeNumberOfItems} />
        <button onClick={handleGenerate}>generate</button>
        <button>reset</button>
      </header>
      <List3 additionalItems={items} />
      {/* <List2 items={items} /> */}
      {/* <List items={items} /> */}
    </div>
  );
}

export default App;
