import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDates, createDate, deleteDate } from '../../actions/dateActions';
import Moment from 'react-moment';
import 'moment-timezone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Dates extends Component {
  state = {
    showForm: false,
    startDate: new Date(),
    type: '',
    description: '',
    errors: {}
  };

  componentDidMount() {
    const { id } = this.props.family.family;
    this.props.getDates(id);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onDateChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  handleDeleteDate = (e) => {
    const { id } = e.target;
    const familyId = this.props.family.family.id;

    this.props.deleteDate(id, familyId);
  };

  handleCreateDate = (e) => {
    e.preventDefault();
    const { id } = this.props.family.family;
    let errors = {};

    if (!this.state.type) {
      errors.type = 'You must enter an event type.';
      return this.setState({ errors });
    }

    if (!this.state.description) {
      errors.description = 'You must enter a description.';
      return this.setState({ errors });
    }

    const newEvent = {
      description: this.state.description,
      type: this.state.type,
      date: this.state.startDate,
      familyId: id
    };

    this.props.createDate(newEvent);

    this.setState({
      description: '',
      type: '',
      date: new Date()
    });
  };

  handleToggleForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm
    }));
  };

  render() {
    const { errors } = this.state;
    const { dates } = this.props.dates;

    return (
      <div>
        <button className='ui button' style={{ marginBottom: 20 }} onClick={this.handleToggleForm}>
          {this.state.showForm ? 'Cancel' : 'Add New'}
        </button>
        {this.state.showForm && (
          <form onSubmit={this.handleCreateDate} className='ui form'>
            <div className={`field ${errors.type ? 'error' : ''}`}>
              <label>{errors.type ? <p>{errors.type}</p> : 'Event Type'}</label>
              <select
                className='ui compact selection dropdown'
                value={this.state.type}
                name='type'
                onChange={this.onChange}
              >
                <option value=''></option>
                <option value='birthday'>Birthday</option>
                <option value='holiday'>Holiday</option>
                <option value='commemoration'>Commemoration</option>
                <option value='other'>Other</option>
              </select>
            </div>
            <div className={`field ${errors.description ? 'error' : ''}`}>
              <label>
                {errors.description ? <p>{errors.description}</p> : 'Event Description'}
              </label>
              <input
                value={this.state.description}
                onChange={this.onChange}
                name='description'
                type='text'
                placeholder='Event description...'
              />
            </div>
            <div className={`field ${errors.date ? 'error' : ''}`}>
              <label>Select Date</label>
              <DatePicker
                showYearDropdown
                selected={this.state.startDate}
                onChange={this.onDateChange}
              />
            </div>
            <input type='submit' value='Add' className='ui button' />
          </form>
        )}

        <div className='ui tiny divided list'>
          {dates
            .sort((a, b) => {
              if (a.date < b.date) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((date) => (
              <div className='item' key={date.id}>
                <i
                  className={`large 
                    ${date.type === 'holiday' && 'plane'} 
                    ${date.type === 'birthday' && 'gift'} 
                    ${date.type === 'commemoration' && 'heart'} 
                    ${date.type === 'other' && 'bullhorn'} 
                    middle aligned icon`}
                  id={date.id}
                  onClick={this.handleDeleteDate}
                  style={{ cursor: 'pointer', marginRight: 10 }}
                />
                <div className='content'>
                  <div className='header'>{date.description}</div>
                  <div
                    style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.8)' }}
                    className='description'
                  >
                    <Moment format='DD MMM YYYY' date={date.date} />
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
  dates: state.dates
});

export default connect(
  mapStateToProps,
  { getDates, createDate, deleteDate }
)(Dates);
