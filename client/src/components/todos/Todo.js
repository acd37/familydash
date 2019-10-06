import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../../actions/todoActions';
import Moment from 'react-moment';
import 'moment-timezone';
import { Popup, List, Image } from 'semantic-ui-react';

const styles = {
  popup: {
    padding: 0,
    minWidth: 200
  }
};

class Todo extends Component {
  state = {
    description: '',
    errors: {}
  };

  componentDidMount() {
    const { id } = this.props.family.family;
    this.props.getTodos(id);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCompleteTodo = (e) => {
    const { id } = e.target;
    const familyId = this.props.family.family.id;

    this.props.deleteTodo(id, familyId);
  };

  handleCreateTodo = (e) => {
    e.preventDefault();
    const { id } = this.props.family.family;
    let errors = {};

    if (!this.state.description) {
      console.log('test');
      errors.description = 'You must enter a task.';
      return this.setState({ errors });
    }

    const newTodo = {
      description: this.state.description,
      familyId: id
    };

    this.props.createTodo(newTodo);

    this.setState({
      description: ''
    });
  };

  getAssignedUserProfilePhoto = (assignedUserId) => {
    if (this.props.users.users.length > 0) {
      const { users } = this.props.users;
      const assignedUser = users.filter((user) => user.id === assignedUserId);
      return assignedUser[0].thumbnail;
    }
  };

  handleTaskAssignment = (todo, userId) => {
    console.log(todo);
    console.log(userId);

    // assign task
    todo.assignedUser = userId;
    this.props.updateTodo(todo);
  };

  render() {
    const { todos } = this.props.todos;
    const { users } = this.props.users;
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.handleCreateTodo} className='ui form'>
          <div className={`field ${errors.description ? 'error' : ''}`}>
            <label>{errors.description ? <p>{errors.description}</p> : 'Add Task'}</label>

            <input
              value={this.state.description}
              onChange={this.onChange}
              name='description'
              type='text'
              placeholder='Add new...'
            />
          </div>
          <input type='submit' value='Add' className='ui button' />
        </form>

        <div className='ui relaxed divided list'>
          {todos.map((todo) => (
            <div className='item' key={todo.id}>
              <div className='right floated content'>
                <i
                  className='check middle aligned icon'
                  id={todo.id}
                  onClick={this.handleCompleteTodo}
                  style={{ cursor: 'pointer', marginRight: 10 }}
                />
              </div>
              {todo.assignedUser !== null ? (
                <Popup
                  content={
                    <List selection verticalAlign='middle' size='tiny'>
                      {users.map((user) => (
                        <List.Item
                          key={user.id}
                          onClick={() => this.handleTaskAssignment(todo, user.id)}
                        >
                          <Image avatar src={user.thumbnail} />
                          <List.Content>
                            <List.Header>
                              {user.firstName} {user.lastName}
                            </List.Header>
                          </List.Content>
                        </List.Item>
                      ))}
                      <List.Item onClick={() => this.handleTaskAssignment(todo, null)}>
                        <Image avatar src={require('../../assets/images/user.png')} />
                        <List.Content>
                          <List.Header>Unassign</List.Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  }
                  hoverable
                  wide
                  hideOnScroll
                  basic
                  style={styles.popup}
                  key={todo.id}
                  trigger={
                    <img
                      alt='profile'
                      style={{ cursor: 'pointer' }}
                      className='ui avatar image'
                      src={this.getAssignedUserProfilePhoto(todo.assignedUser)}
                    />
                  }
                />
              ) : (
                <Popup
                  content={
                    <List selection verticalAlign='middle' size='tiny'>
                      {users.map((user) => (
                        <List.Item onClick={() => this.handleTaskAssignment(todo, user.id)}>
                          <Image avatar src={user.thumbnail} />
                          <List.Content>
                            <List.Header>
                              {user.firstName} {user.lastName}
                            </List.Header>
                          </List.Content>
                        </List.Item>
                      ))}
                      <List.Item onClick={() => this.handleTaskAssignment(todo, null)}>
                        <Image avatar src={require('../../assets/images/user.png')} />
                        <List.Content>
                          <List.Header>Unassign</List.Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  }
                  hoverable
                  wide
                  hideOnScroll
                  basic
                  style={styles.popup}
                  key={todo.id}
                  trigger={
                    <img
                      alt='profile'
                      style={{ cursor: 'pointer' }}
                      className='ui avatar image'
                      src={require('../../assets/images/user.png')}
                    />
                  }
                />
              )}

              <div className='content'>
                <div className='header'>{todo.description}</div>
                <div
                  style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.4)' }}
                  className='description'
                >
                  added <Moment fromNow ago date={todo.createdAt} /> ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
  family: state.family,
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { getTodos, createTodo, deleteTodo, updateTodo }
)(Todo);
