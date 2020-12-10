import React from 'react'
import { VariableSizeList } from "react-window"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = () => {
  const [items, setItems] = React.useState([])
  const [numberOfItems, setNumberOfItems] = React.useState('')

  const handleChangeNumberOfItems = (e) => {
    setNumberOfItems(e.target.value)
  }
  const handleGenerate = () => { 
    let newItems = Array.from({length: numberOfItems}, () => uuidv4())
      .map(id => ({ id, content: lorem.generateSentences(Math.floor(Math.random() * 4) + 2 ) }))
    setItems(items.concat(newItems))
  }

  const onDragEnd = (result) => {
    if(!result.destination) {
      return
    }
    const newItems = reorder(items, result.source.index, result.destination.index)
    setItems(newItems)
  }

  const handleReset = () => {
    setItems([])
  }

  const handleRemove = (index) => () => {
    let before = items.slice(0, index)
    let after = items.slice(index + 1)
    setItems(before.concat(after))
  }

  return (
    <div className="App">
      <header className="App-header">
        <input id="number-of-items" type="number"  placeholder="# of items" value={numberOfItems} onChange={handleChangeNumberOfItems} />
        <button onClick={handleGenerate}>generate</button>
        <button onClick={handleReset}>reset</button>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="list">
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div 
                        className="list-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                      > 
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                          <p>{item.content}</p>
                          <div style={{width: 30}}>
                            <button onClick={handleRemove(index)}>x</button>
                          </div>
                         
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
      </Droppable>
      </div>
    </DragDropContext>
     
    </div>
  );
}

export default App;
