import React, { useRef, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { List as VirtualList } from "react-virtualized"
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

  useEffect(() => {
    if (items.length > 0) {
      scrollToBottom();
    }
    // eslint-disable-next-line
  }, [items]);

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

  const getRowRender = ({index, style}) => {
    const item = items[index]

    if(!item) return null

    const patchedStyle = {
      ...style,
    }

    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(draggableProvided, snapshot) => {
          let a = draggableProvided.innerRef
          debugger
          setRowHeight(index,draggableProvided.innerRef.clientHeight)
          return (
          <div 
            className="list-item"
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            style={patchedStyle}
          > 
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <p>{item.content}</p>
              <div style={{width: 30}}>
                <button onClick={handleRemove(index)}>x</button>
              </div>
              
            </div>
          </div>
        )
  }}
      </Draggable>
    )
  }

   // DYNAMIC HEIGHT STUFF
  // https://codesandbox.io/s/react-chat-simulator-yg114?file=/src/ChatRoom/Room/Messages/Messages.js:1354-1366
  // references
  const listRef = useRef({})
  const rowHeights = useRef({});

  function getRowHeight(index) {
    return rowHeights.current[index] + 8 || 82;
  }

  function setRowHeight(index, size) {
    // listRef.current.resetAfterIndex(0);
    debugger

    rowHeights.current = { ...rowHeights.current, [index]: size };
  }

  function scrollToBottom() {
    listRef.current.scrollToRow(items.length - 1);
  }

  const [haveScrolled, setHaveScrolled] = React.useState(false)

  const handleScroll = ({clientHeight, scrollHeight, scrollTop},a2,a3) => {
    if(scrollHeight && scrollHeight - clientHeight !== scrollTop) {
      setHaveScrolled(true)
    } else {
      setHaveScrolled(false)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <input id="number-of-items" type="number"  placeholder="# of items" value={numberOfItems} onChange={handleChangeNumberOfItems} />
        <button onClick={handleGenerate}>generate</button>
        <button onClick={handleReset}>reset</button>
        {haveScrolled && <button onClick={handleScroll}>back to bottom</button>}
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="list">
          <Droppable droppableId="droppable" mode="virtual">
            {(droppableProvided, snapshot) => (
              <VirtualList
                height={400}
                width={500}
                rowCount={items.length}
                rowHeight={({index}) => {
                  let a = rowHeights
                  debugger
                  return index * 100
                }}
                onScroll={handleScroll}
                // ref={ref => {
                //   if (ref) {
                //     // eslint-disable-next-line react/no-find-dom-node
                //     const listRef = ReactDOM.findDOMNode(ref);
                //     if (listRef instanceof HTMLElement) {
                //       droppableProvided.innerRef(listRef);
                //     }
                //   }
                // }}
                ref={listRef}
                rowRenderer={getRowRender}
              >
                {droppableProvided.placeholder}
              </VirtualList>
            )}
        </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
