import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  Grid,
  Container,
  Typography,
  CardMedia,
  Card,
  CardContent,
  TextField,
  Button,
  CardActions,
  Alert,
} from '@mui/material';
import TaskCard from '../components/TaskCard';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    setTaskName(e.target.value);
  };

  const checkIfTaskExists = (enteredTaskName) => {
    const tasksList = data.getAllTasks();
    return tasksList.find((task) => task.name === enteredTaskName);
  };

  const saveTaskObject = (enteredTaskName) => {
    const existingTask = checkIfTaskExists(enteredTaskName);
    if (existingTask) {
      data.saveCurrentTaskObject(existingTask);
    } else {
      const newTask = {
        name: enteredTaskName,
        dateCreated: new Date(),
        currentStatus: 'idle',
        description: '',
      };
      data.saveCurrentTaskObject(newPlayer);
      data.addNewTaskObjectToArrayAndSave(newPlayer);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (taskName === '') {
      setErrorMessage('You must enter task name to create new task');
    } else {
      saveTaskObject(taskName);
      history.push('/edit');
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Item>
              <Card>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Enter new task
                    </Typography>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: '100%',
                      }}
                    >
                      {errorMessage && (
                        <Box
                          sx={{
                            paddingTop: 2,
                            paddingBottom: 2,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <Alert severity="error">{errorMessage}</Alert>
                        </Box>
                      )}
                      <TextField
                        fullWidth
                        label="New task"
                        id="fullWidth"
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"
                        error={errorMessage}
                      />
                    </Box>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" type="submit">
                      create task
                    </Button>
                  </CardActions>
                </form>
              </Card>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <TaskCard />
              <TaskCard />
              <TaskCard />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
