import React from 'react'
import { VariableSizeList } from "react-window"
import './App.css';


const List = ({ items }) => {
  const listRef = React.useRef(null)
  const rowHeights = React.useRef({})

  React.useEffect(() => {
    if(items.length) {
      scrollToBottom()
    }
  }, [items])

  function scrollToBottom() {
    listRef.current.scrollToItem(items.length + 1, "end");
  }

  function Row ({index, style}) {
    const rowRef = React.useRef(null)

    React.useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
      // eslint-disable-next-line
    }, [rowRef]);

    return (
      <div className="list-item" style={style} ref={rowRef}>
        <p>item {index + 1}</p>
        <p>{items[index]}</p>
      </div>
    )
    }

  function setRowHeight (index, size) {
    listRef.current.resetAfterIndex(0)
    let a = index
    let b = items[index]
    debugger
    rowHeights.current = {
      ...rowHeights.current, 
      [index]: size
    }
  }

  function getRowHeight (index)  {
    return rowHeights.current[index] + 10 || 100
  }

  return (
      <div className="list">
        <button onClick={scrollToBottom}>back to bottom</button>
        <VariableSizeList
          ref={listRef}
          height={500}
          itemCount={items.length}
          itemSize={getRowHeight}
        >
            {Row}
        </VariableSizeList>
      </div>
  )
}

export default List;
