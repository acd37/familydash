import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos, createTodo, deleteTodo } from '../../actions/todoActions';
import Moment from 'react-moment';
import 'moment-timezone';

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

  render() {
    const { todos } = this.props.todos;
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
            <div class='item' key={todo.id}>
              <i
                className='large check middle aligned icon'
                id={todo.id}
                onClick={this.handleCompleteTodo}
                style={{ cursor: 'pointer', marginRight: 10 }}
              />
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
  auth: state.auth,
  family: state.family,
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { getTodos, createTodo, deleteTodo }
)(Todo);
