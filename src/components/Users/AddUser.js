import React, { useState }  from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = props => {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (userName.trim().length === 0 || userAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and an age (non-empty-values)"
      });
      return
    }

    if (+userAge < 1) {
       setError({
        title: "Invalid age",
        message: "Please enter a valid age (bigger than 0)"
      });
       return
    }

    props.onAddUser(userName, userAge);
    setUserName('');
    setUserAge('');
  }

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  }

  const ageChangeHandler = (event) => {
    setUserAge(event.target.value);
  }

  const ErrorHandler = () => {
    setError(null);
  }

  return (
    <div>
      {error && (
        <ErrorModal
        title={error.title}
        message={error.message}
        onConfirm={ErrorHandler}
        />)}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input type="text" value={userName} id="username" onChange={userNameChangeHandler} />
          <label htmlFor="age">Age (Years)</label>
          <input type="number" value={userAge} id="age" onChange={ageChangeHandler} />
         <Button type="submit">Add User</Button>
      </form>
    </Card>
    </div>
  )

};

export default AddUser;
