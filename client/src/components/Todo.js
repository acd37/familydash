import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos, createTodo, deleteTodo } from '../actions/todoActions';
import classnames from 'classnames';

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
    const { family } = this.props.family;
    const { errors } = this.state;

    return (
      <div>
        <h1> Tasks </h1>

        <form onSubmit={this.handleCreateTodo}>
          <div className='input-group mb-3'>
            <input
              value={this.state.description}
              onChange={this.onChange}
              name='description'
              type='text'
              className={classnames('form-control', {
                'is-invalid': errors.description
              })}
              placeholder='Task description...'
              aria-label="Recipient's username"
              aria-describedby='button-addon2'
            />
            <div className='input-group-append'>
              <button className='btn btn-primary' type='submit' id='button-addon2'>
                Submit
              </button>
            </div>
          </div>
          {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
        </form>

        <div>
          {todos.map((todo) => (
            <div key={todo.id}>
              <span
                id={todo.id}
                onClick={this.handleCompleteTodo}
                style={{ cursor: 'pointer', marginRight: 10 }}
              >
                ✔
              </span>

              {todo.description}
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
