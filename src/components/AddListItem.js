import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

export default function AddLisItem({onItemAdded}) {
  const classes = useStyles();

  const [name, setName] = useState('')

  const onLabelChange = (event) => {
    const changedName = event.target.value;
    setName(changedName)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    onItemAdded(name);
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
      <Grid container justify="center">
        <Grid item sm={4}>
          <Input
          value={name}
          inputProps={{ 'aria-label': 'description' }} 
          onChange={onLabelChange}
          placeholder="Add new item"
          />
        </Grid>
        <Grid item sm={1}>
          <IconButton aria-label="add" color="primary" type="submit">
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
}