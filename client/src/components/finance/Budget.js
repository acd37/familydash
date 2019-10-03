import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getBudgetCategories } from '../../actions/financeActions';

class Budget extends Component {
  componentDidMount() {
    this.props.getBudgetCategories();
  }
  render() {
    const { budgetCategories } = this.props;

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
            <div className='item' style={{ marginBottom: 10 }}>
              <i class='money icon'></i>
              <div className='content'>
                <div className='header'>{category.name}</div>

                <Fragment>
                  {category.categories
                    .filter((lineItem) => lineItem.balance !== 0)
                    .map((lineItem) => (
                      <div className='description' style={{ marginLeft: 20 }}>
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
  budgetCategories: state.finance.budgetCategories
});

export default connect(
  mapStateToProps,
  { getBudgetCategories }
)(Budget);
