import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import EditItem from "./EditItem";

const useStyles = makeStyles((theme)=>({
  card: {
    display: 'flex',
    width: '100%',
  },
  content:{
    flex: '1 0 auto',
    padding:'0 10px 0 20px!important',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  h5:{
    fontSize:'1rem'
  }
}))

const ListCard = ({listItem, onDeleted, editItem}) => {
  const classes = useStyles()

  const [isEdit, setIsEdit] = useState(false)

  const isEditHandler = () => {
      setIsEdit(!isEdit)
  }
  
  return(
    <Card className={classes.card}>
        <CardContent className={classes.content}>
          {isEdit ? (
            <EditItem
              listItem={listItem}
              editItem={editItem}
              isEditHandler={isEditHandler}
            />
          ) : (
            <Typography
              component="h5"
              variant="h5"
              className={classes.h5}
              onDoubleClick={isEditHandler}
            >
              {listItem.name}
            </Typography>
          )}

          <IconButton 
            aria-label="delete" 
            color="primary"
            item={listItem.id} 
            onClick={onDeleted}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
    </Card>
  )
}

export default ListCard