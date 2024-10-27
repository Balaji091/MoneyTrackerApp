import React, { Component } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import TransactionItem from '../TransactionItem';

class MoneyManager extends Component {
  state = { title: '', amount: '', option: '', lists: [] };

  setTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  setAmount = (event) => {
    this.setState({ amount: event.target.value });
  };

  setOption = (event) => {
    this.setState({ option: event.target.value });
  };

  setTransaction = () => {
    const { title, amount, option, lists } = this.state;
    const transactionList = {
      title,
      amount,
      option,
      id: uuidv4(),
    };
    if (title && amount && option) {
      this.setState({
        lists: [...lists, transactionList],
        title: '',
        amount: '',
        option: '',
      });
    }
  };

  deleteTransaction = (id) => {
    const { lists } = this.state;
    const resultList = lists.filter((item) => item.id !== id);
    this.setState({ lists: resultList });
  };

  render() {
    const { title, amount, option, lists } = this.state;
    const totalIncome = lists
      .filter((item) => item.option === 'Income')
      .reduce((acc, item) => acc + parseFloat(item.amount), 0);

    const totalExpenses = lists
      .filter((item) => item.option === 'Expenses')
      .reduce((acc, item) => acc + parseFloat(item.amount), 0);

    const totalBalance = totalIncome - totalExpenses;

    return (
      <div className="money-manager">
        <div className="header">
          <h2>Hi, Richard</h2>
          <p>
            Welcome back to your <span className="highlight">Money Manager</span>
          </p>
        </div>

        <div className="summary-cards">
          <div className="card balance-card">
            <p>Your Balance</p>
            <h3>Rs {totalBalance}</h3>
          </div>
          <div className="card income-card">
            <p>Your Income</p>
            <h3>Rs {totalIncome}</h3>
          </div>
          <div className="card expense-card">
            <p>Your Expenses</p>
            <h3>Rs {totalExpenses}</h3>
          </div>
        </div>

        <div className="transaction-section">
          <div className="add-transaction">
            <h3>Add Transaction</h3>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={this.setTitle}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={this.setAmount}
            />
            <select onChange={this.setOption} value={option}>
              <option value="" disabled>
                Select Type
              </option>
              <option value="Income">Income</option>
              <option value="Expenses">Expenses</option>
            </select>
            <button onClick={this.setTransaction}>Add</button>
          </div>

          <div className="transaction-history">
            <h3>History</h3>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {lists.map((item) => (
                  <TransactionItem
                    details={item}
                    key={item.id}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MoneyManager;
