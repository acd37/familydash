import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createFamily, joinFamily } from '../../actions/familyActions';
import Alert from '../common/Alert';

class NewUser extends Component {
  state = {
    code: '',
    familyName: '',
    familyCode: '',
    errors: {}
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleJoinFamily = (e) => {
    e.preventDefault();

    let errors = {};

    if (!this.state.familyCode) {
      errors.familyCode = 'You must provide a family code.';
      return this.setState({ errors });
    } else {
      this.props.joinFamily(this.state.familyCode);
    }
  };

  handleCreateNewFamily = (e) => {
    e.preventDefault();

    let errors = {};

    if (!this.state.familyName) {
      errors.familyName = 'You must provide a family name.';
      return this.setState({ errors });
    }

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

        <div className='ui placeholder segment'>
          <div className='ui two column very relaxed stackable grid'>
            <div className='column'>
              <form className='ui form' onSubmit={this.handleJoinFamily}>
                <div className={`field ${errors.familyCode ? 'error' : ''}`}>
                  <label>
                    {errors.familyCode ? <p>{errors.familyCode}</p> : 'Join an Existing Family'}
                  </label>

                  <input
                    placeholder='Add your family code here...'
                    name='familyCode'
                    type='text'
                    value={this.state.familyCode}
                    onChange={this.onChange}
                  />
                </div>
                <input type='submit' className='fluid ui button' />
              </form>
            </div>
            <div className='column'>
              <form className='ui form' onSubmit={this.handleCreateNewFamily}>
                <div className={`field ${errors.familyName ? 'error' : ''}`}>
                  <label>
                    {errors.familyName ? <p>{errors.familyName}</p> : 'Create New Family'}
                  </label>

                  <input
                    placeholder='What should we call your family group...?'
                    name='familyName'
                    type='text'
                    value={this.state.familyName}
                    onChange={this.onChange}
                  />
                </div>
                <input type='submit' className='fluid ui button' />
              </form>
            </div>
          </div>
          <div className='ui vertical divider'>Or</div>
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
  { createFamily, joinFamily }
)(NewUser);
