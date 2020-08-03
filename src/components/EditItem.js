import React, {useState} from 'react';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

export default function EditItem({listItem, editItem, isEditHandler}) {

  const [name, setName] = useState(listItem.name)

  const onLabelChange = (event) => {
    const changedName = event.target.value;
    setName(changedName)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    editItem(listItem.id, name);
    isEditHandler()
  }

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Grid container>
        <Input
          defaultValue={name}
          inputProps={{'aria-label': 'description'}}
          onChange={onLabelChange}
          placeholder={name}
        />
        <IconButton aria-label="add" color="primary" type="submit">
          <EditIcon/>
        </IconButton>
        <IconButton aria-label="add" color="primary" onClick={isEditHandler}>
          <CloseIcon/>
        </IconButton>
      </Grid>
    </form>
  );
}