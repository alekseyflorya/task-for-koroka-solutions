import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListCard from './components/ListCard';
import AddLisItem from './components/AddListItem';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Pagination from '@material-ui/lab/Pagination';

import ListData from './components/ListData'

const useStyles = makeStyles((theme) => ({
    offset:theme.mixins.toolbar,

    pagination: {
      display: "flex",
      justifyContent: "center"
    },
    list: {
      height: '75vh'
    }
}))

function App() {
  const [listItems, setListItems] = useState(ListData)

  const list = listItems.map((item,index)=>(
    <Draggable
      key={item.id}
      draggableId={item.id}
      index={index}
    >
      {(provided, snapshot) => (
        <ListItem
          innerRef={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <ListCard
            listItem={item}
            onDeleted={() => deleteItem(item.id)}
            editItem={editItem}
          >
          </ListCard>
        </ListItem>
      )}
    </Draggable>
  ))

  const calcLength = (list) => Math.ceil(list.length / 10)

  const onDragEnd = (result) => {
    if(!result.destination){
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const listNew = Array.from(listItems);
    const [removed] = listNew.splice(startIndex, 1);
    listNew.splice(endIndex,0,removed)

    setListItems(listNew)
  }

  const [count, setCount] = useState(calcLength(list))

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const deleteItem = (id) => {
    const idx = listItems.findIndex((item) => item.id === id);
    const itemsNew = [
      ...listItems.slice(0, idx),
      ...listItems.slice(idx + 1)
    ]
    setListItems(itemsNew)
    setCount(calcLength(itemsNew))
  }

  const editItem = (id, text) => {
    console.log(id, text);
    const idx = listItems.findIndex((item) => item.id === id);
    console.log(idx, text);
    let itemsNew = Array.from(listItems);
    itemsNew[idx].name = text;
    setListItems(itemsNew)
    setCount(calcLength(itemsNew))
  }

  const maxId = listItems.length + 1;

  const addItem = (text) => {
    console.log(maxId, text);
    const newItem = {
      id: `list-${maxId+1}`,
      name: text
    }

    const newArr = [
      ...listItems,
    newItem
    ];

    setListItems(newArr)
    setCount(calcLength(newArr))
  }

  const classes = useStyles()
  return (
    <>
      <AppBar position="fixed">
        <ToolBar>
          <Typography 
            variant="h6" 
            component="h6"
          >
            Task for Front-End Developer | By Aleksey Florya
          </Typography>
        </ToolBar>
      </AppBar>
      <div className={classes.offset} />
      
      <Container maxWidth="sm">
      <AddLisItem onItemAdded={addItem}/>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <List 
                {...provided.droppableProps}
                innerRef={provided.innerRef}
                className={classes.list}
              >
                {list.slice((page-1)*10, page*10)}

              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
      <div className={classes.pagination}>
        <Pagination 
          count={count} 
          page={page} 
          onChange={handleChange} 
          color="primary" 
        />
      </div>
    </>
  );
}

export default App;
