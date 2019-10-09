import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDates, createDate, deleteDate } from '../../actions/dateActions';
import Moment from 'react-moment';
import moment from 'moment';
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

    const confirm = window.confirm('Are you sure you want to delete this date from your list?');
    if (confirm) {
      this.props.deleteDate(id, familyId);
    }
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

  daysUntil = (date) => {
    const birthday = moment(date);
    const today = moment().format('YYYY-MM-DD');

    // calculate age of the person
    const age = moment(today).diff(birthday, 'years');
    moment(age).format('YYYY-MM-DD');
    console.log('person age', age);

    let nextBirthday = moment(birthday).add(age, 'years');
    moment(nextBirthday).format('YYYY-MM-DD');

    if (nextBirthday.isSame(today)) {
      return 'Cake!!';
    } else {
      nextBirthday = moment(birthday).add(age + 1, 'years');
      return nextBirthday.diff(today, 'days');
    }
  };

  getNextOccurence = (date) => {
    const res = this.daysUntil(date);
    return res;
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
                  <div className='header'>
                    {date.description} (<Moment format='MMM DD, YYYY' date={date.date} />)
                  </div>
                  <div
                    style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.8)' }}
                    className='description'
                  >
                    {this.getNextOccurence(date.date) < 21 ? (
                      <span style={{ color: '#cc0000' }}>
                        {this.getNextOccurence(date.date)} days to go
                      </span>
                    ) : (
                      <span>{this.getNextOccurence(date.date)} days to go</span>
                    )}
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
