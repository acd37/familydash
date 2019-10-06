import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getBudgetCategories } from '../../actions/financeActions';
import { updateFamily } from '../../actions/familyActions';

class Budget extends Component {
  state = {
    apiKey: null,
    budgetId: null,
    errors: {}
  };

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    this.props.getBudgetCategories();
  }

  handleSubmitAPIKey = (e) => {
    e.preventDefault();
    let errors = {};

    if (!this.state.apiKey) {
      errors.key = 'You must supply a valid key.';
      this.setState({ errors });
    }

    if (!this.state.budgetId) {
      errors.budgetId = 'You must supply a valid key.';
      this.setState({ errors });
    }

    const data = {
      budgetId: this.state.budgetId,
      apiKey: this.state.apiKey
    };

    this.props.updateFamily(data);
  };

  render() {
    const { budgetCategories, family } = this.props;
    const { errors } = this.state;

    if (!family.family.financeKey) {
      return (
        <div>
          <img
            alt='ynab logo'
            style={{ height: 25, marginBottom: '20px' }}
            src={require('../../assets/images/ynab.png')}
          />

          <form onSubmit={this.handleSubmitAPIKey} className='ui form'>
            <div className={`field ${errors.key ? 'error' : ''}`}>
              <label>{errors.key ? <p>{errors.key}</p> : 'YNAB API Key'}</label>
              <input
                placeholder='API Key...'
                name='apiKey'
                type='text'
                value={this.state.apiKey}
                onChange={this.onChange}
              />
            </div>
            <div className={`field ${errors.budgetId ? 'error' : ''}`}>
              <label>{errors.budgetId ? <p>{errors.budgetId}</p> : 'YNAB Budget Id'}</label>
              <input
                placeholder='Budget ID'
                name='budgetId'
                type='text'
                value={this.state.budgetId}
                onChange={this.onChange}
              />
            </div>
            <input type='submit' className='ui button' />
          </form>

          <p style={{ marginTop: 20 }}>
            The budgeting tile is courtesy of YNAB, you need an API key to proceed.
          </p>
        </div>
      );
    }

    return (
      <div className='ui list'>
        {budgetCategories
          .filter(
            (category) =>
              category.name !== 'Hidden Categories' &&
              category.name !== 'Creditors' &&
              category.name !== 'Internal Master Category'
          )
          .map((category) => (
            <div key={category.id} className='item' style={{ marginBottom: 10 }}>
              <i className='money icon'></i>
              <div className='content'>
                <div className='header'>{category.name}</div>

                <Fragment>
                  {category.categories
                    .filter((lineItem) => lineItem.balance !== 0)
                    .map((lineItem) => (
                      <div key={lineItem.id} className='description' style={{ marginLeft: 20 }}>
                        {lineItem.name}: ${(lineItem.balance / 1000).toFixed(2)}
                      </div>
                    ))}
                </Fragment>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  family: state.family,
  budgetCategories: state.finance.budgetCategories
});

export default connect(
  mapStateToProps,
  { getBudgetCategories, updateFamily }
)(Budget);
