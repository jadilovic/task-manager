import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorageHook from '../utils/useLocalStorageHook';
import { styled } from '@mui/material/styles';
import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Container,
  Button,
  Box,
  Paper,
  Card,
  InputLabel,
  Typography,
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Form = () => {
  const history = useHistory();
  const data = useLocalStorageHook();
  const [formValues, setFormValues] = useState({});

  const taskStatusesList = [
    { id: 1, message: 'Idle task', severity: 'error' },
    { id: 2, message: 'Ongoing task', severity: 'warning' },
    { id: 3, message: 'Completed', severity: 'success' },
  ];

  useEffect(() => {
    const taskName = localStorage.getItem('currentTaskName');
    setFormValues(data.getCurrentTaskObject(taskName));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      ['currentStatus']: taskStatusesList[event.target.value],
    });
  };

  console.log('form values ', formValues);

  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h6" component="div">
            Edit task
          </Typography>
          <Item>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
                spacing={4}
              >
                <Grid item xs={12}>
                  <TextField
                    id="name-input"
                    name="name"
                    label="Name"
                    type="text"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="dateCreatedt"
                    name="dateCreated"
                    label="Date Created"
                    type="string"
                    value={formValues.dateCreated}
                    onChange={handleInputChange}
                    disabled
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formValues?.currentStatus?.id}
                      label="Task current status"
                      onChange={handleChange}
                    >
                      {taskStatusesList.map((taskStatus) => {
                        return (
                          <MenuItem value={taskStatus.id}>
                            {taskStatus.message}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </form>
          </Item>
        </Grid>
      </Box>
    </Container>
  );
};
export default Form;
