// import React from 'react';
// import apiClient from '../services/api';

// //import ExpensesForm from './ExpensesForm';

// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// //import PieChartComponent from './ChartJS';
// import { Pagination } from 'react-bootstrap';
// // import Categories from './Categories';

// class Expense extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             expenses: [],
//             data: [],
//             sort: (a, b) => a.id > b.id ? 1 : -1,
//             filter: [],
//             fromDate: '',
//             toDate: ''

//         };



//     }
//     fetchExpenses() {
//         if (this.props.loggedIn) {
//             apiClient.get('sanctum/csrf-cookie').then(() => apiClient.get('/api/expenses')
//                 .then(response => {
//                     const expenses = response.data.data;
//                     this.setState({ expenses: expenses, filter: expenses });
//                 })
//                 .catch(error => console.error(error)
//                 ))

//         }
//     }
//     componentDidMount = (props) => {
//         this.fetchExpenses();
//         this.getChart();
//         this.setState({ filter: this.state.expenses })

//     }

//     handleAddExpense = () => {

//         this.fetchExpenses();


//         this.getChart();
//     }
//     handleDeleteExpense = (id) => {
//         apiClient.get('/sanctum/csrf-cookie')
//             .then(response => {
//                 apiClient.post('/api/deleteExpense', {
//                     id: id
//                 }


//                 )
//                 const expenses = this.state.expenses.filter(item => item.id !== id);
//                 const filter = this.state.filter.filter(item => item.id !== id);
//                 this.setState({ expenses: expenses, filter: filter });
//             });
//         this.getChart();


//     }


//     getChart = () => {
//         if (this.props.loggedIn) {
//             apiClient.get('sanctum/csrf-cookie').then(() => apiClient.get('/api/chartData')
//                 .then(response => {
//                     const data = response.data;
//                     this.setState({ data: data });
//                 })
//                 .catch(error => console.error(error)
//                 ))

//         }
//     }
//     handleAmountSort = () => {
//         if (this.state.sort == '(a, b) => a.amount > b.amount ? 1 : -1') {
//             this.setState({ sort: (a, b) => a.amount > b.amount ? -1 : 1 });

//         }
//         else { this.setState({ sort: (a, b) => a.amount > b.amount ? 1 : -1 }); }
//     }
//     handleDateSort = () => {
//         if (this.state.sort == '(a, b) => a.date > b.date ? 1 : -1') {
//             this.setState({ sort: (a, b) => a.date > b.date ? -1 : 1 })
//         }
//         else { this.setState({ sort: (a, b) => a.date > b.date ? 1 : -1 }) }
//     }

//     filterCatId = categories => {
//         let expenses = this.state.expenses
//         if (categories == 0) { expenses = this.state.expenses } else {

//             expenses = this.state.expenses.filter(item => item.category_id == categories);


//         } this.setState({ filter: expenses })
//     }

//     changeFrom = (e) => {
//         const from = e.target.value;
//         this.setState({ fromDate: from })


//     }
//     changeTo = (e) => {
//         const to = e.target.value;
//         this.setState({ toDate: to })

//     }

//     changeDate = () => {

//         if (this.state.fromDate && this.state.toDate) {
//             const expenses = this.state.expenses.filter(item => item.date >= this.state.fromDate && item.date <= this.state.toDate);
//             this.setState({ filter: expenses });

//         }
//     }

//     resetExpenses = () => {

//         this.setState({ filter: this.state.expenses });
//         this.setState({ fromDate: '' });
//         this.setState({ toDate: '' })

//     }

//     render() {


//         if (this.props.loggedIn) {
//             return (
//                 <>

//                     {/* <ExpensesForm onAddExpense={this.handleAddExpense} /> */}




//                     <div className="shadow p-3 mb-5 bg-light rounded split left" >

//                         <h3>Filter By:</h3>
//                         <table>
//                             <thead>
//                                 <tr align='center'>
//                                     <th>Category</th>
//                                     <th>From Date</th>
//                                     <th>To Date</th>
//                                 </tr></thead>
//                             <tbody>
//                                 <tr>
//                                     {/* <td text-align="center"><Categories onChangeCatId={this.filterCatId} {...this.props} loggedIn={true} /></td> */}
//                                     <td><input className="form-control" type="date" onChange={this.changeFrom} value={this.state.fromDate}></input></td>

//                                     <td><input className="form-control" type="date" onChange={this.changeTo} value={this.state.toDate}></input></td>
//                                     <td><button className="btn btn-dark" type="submit" onClick={this.changeDate}>Filter</button></td>
//                                     <td><button className="btn btn-dark" type="submit" onClick={this.resetExpenses}>Reset</button></td>
//                                 </tr></tbody></table>

//                         <div className="scroll">
//                             <table className="table table-striped tableLeft">
//                                 <thead className='thead-dark'>
//                                     <tr>
//                                         <th>#</th>

//                                         <th onClick={this.handleAmountSort}>Amount</th>
//                                         <th>Category</th>
//                                         <th onClick={this.handleDateSort}>Date</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="">
//                                     {this.state.filter.sort(this.state.sort).map((expense) => {
//                                         return (
//                                             <tr key={expense.id}>
//                                                 <td>{expense.id}</td>
//                                                 <td >{expense.amount} $</td>
//                                                 <td >{expense.category.name}</td>
//                                                 <td >{expense.date}</td>

//                                                 <td><Link to={{ pathname: `/editExpense`, state: { eid: expense.id } }}>
//                                                     <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                                                         <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
//                                                     </svg></Link><span>    </span>
//                                                     <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { this.handleDeleteExpense(expense.id) }}>
//                                                         <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
//                                                     </svg>

//                                                 </td>
//                                             </tr>);
//                                     })}
//                                 </tbody></table></div>

//                     </div>

//                     {/* <div className="shadow p-3 mb-5 bg-gradient-light rounded split right" height="100%">

//                         <PieChartComponent dataParentToChild={this.state.data} /></div> */}
//                         </>



//             );
//         }
//         return (
//             <div className="alert alert-warning">You are not logged in.</div>
//         );

//     }

// }

// export default Expense;