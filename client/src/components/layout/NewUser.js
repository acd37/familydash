import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createFamily } from '../../actions/familyActions';
import Alert from '../common/Alert';

class NewUser extends Component {
  state = {
    code: '',
    familyName: '',
    errors: {}
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCreateNewFamily = (e) => {
    e.preventDefault();

    const newFamily = {
      familyName: this.state.familyName
    };

    this.props.createFamily(newFamily);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='container'>
        <Alert
          alertType='primary'
          boldText={`Hey, ${this.props.auth.user.firstName}!`}
          text='You do not currently have a family unit. You need to join an
            existing unit or start a new one.'
        />

        <div className='row'>
          <div className='col-md-6'>
            <h4>Join an existing family</h4>
            <form>
              <input
                placeholder='Add your family code here...'
                name='code'
                type='text'
                value={this.state.code}
                onChange={this.onChange}
                className={classnames('form-control', {
                  'is-invalid': errors.code
                })}
              />
              {errors.code && <div className='invalid-feedback'>{errors.code}</div>}
              <input type='submit' className='btn btn-primary btn-block mt-4' />
            </form>
          </div>

          <div className='col-md-6'>
            <h4>Start a new family</h4>
            <form onSubmit={this.handleCreateNewFamily}>
              <input
                placeholder='What should we call your family group...?'
                name='familyName'
                type='text'
                value={this.state.familyName}
                onChange={this.onChange}
                className={classnames('form-control', {
                  'is-invalid': errors.familyName
                })}
              />
              {errors.code && <div className='invalid-feedback'>{errors.familyName}</div>}
              <input type='submit' className='btn btn-primary btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createFamily }
)(NewUser);
