import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const itemsList = [
  {id: 'item-1', content: 'item 1 content'},
  {id: 'item-2', content: 'item 2 content'},
  {id: 'item-3', content: 'item 3 content'},
]

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


export default ({ additionalItems }) => {
  const [_items, setItems] = React.useState([])

  React.useEffect(() => {
    setItems(_items.concat(additionalItems))
  }, [additionalItems])

  const onDragEnd = (result) => {
    if(!result.destination) {
      return
    }
    const newItems = reorder(_items, result.source.index, result.destination.index)
    setItems(newItems)
  }

  console.log("========= RENDER =============")
  console.log(_items)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="list">
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {_items.map((item, index) => {
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
                        <p>{item.content}</p>
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
  )
}