import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Add participant function
  const addParticipant = () => {
    if (name && !participants.includes(name)) {
      setParticipants([...participants, name]);
      setName('');
    }
  };

  // Remove participant function
  const removeParticipant = (participant) => {
    setParticipants(participants.filter(p => p !== participant));
  };

  // Add expense function
  const addExpense = () => {
    if (expenseDescription && amount && paidBy) {
      const newExpense = { description: expenseDescription, amount: parseFloat(amount), paidBy };
      setExpenses([...expenses, newExpense]);
      setExpenseDescription('');
      setAmount('');
      setPaidBy('');
    }
  };

  // Calculate balance for each participant
  const calculateBalance = () => {
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const sharePerPerson = totalExpenses / participants.length;

    const balances = participants.map((person) => {
      let amountPaid = expenses
        .filter((expense) => expense.paidBy === person)
        .reduce((acc, expense) => acc + expense.amount, 0);
      let balance = amountPaid - sharePerPerson;
      return { person, amountPaid, balance };
    });

    setSummary(balances);
  };

  // Generate the report
  const generateReport = () => {
    let report = `Expense Splitter Report\n\nTotal Expenses: ₹${expenses.reduce((acc, expense) => acc + expense.amount, 0)}\n\n`;
    summary.forEach(entry => {
      report += `${entry.person}: Paid ₹${entry.amountPaid.toFixed(2)} | Balance ₹${entry.balance.toFixed(2)}\n`;
    });
    return report;
  };

  // Copy the report to clipboard
  const copyReport = () => {
    const report = generateReport();
    navigator.clipboard.writeText(report).then(() => {
      alert("Report copied to clipboard!");
    });
  };

  // Share the report via email
  const shareReport = () => {
    const report = generateReport();
    const mailtoLink = `mailto:?subject=Expense Splitter Report&body=${encodeURIComponent(report)}`;
    window.location.href = mailtoLink;
  };

  // Scroll to top functionality
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <h1>Expense Splitter</h1>

      <div className="input-section">
        <h3>Add Participants</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter participant name"
        />
        <button onClick={addParticipant}>Add Participant</button>
      </div>

      <div className="participants-section">
        <h3>Participants</h3>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>
              <span className="name">{participant}</span>
              <button className="remove-btn" onClick={() => removeParticipant(participant)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="expense-section">
        <h3>Add Expenses</h3>
        <input
          type="text"
          value={expenseDescription}
          onChange={(e) => setExpenseDescription(e.target.value)}
          placeholder="Expense description"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          <option value="">Select who paid</option>
          {participants.map((participant, index) => (
            <option key={index} value={participant}>
              {participant}
            </option>
          ))}
        </select>
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="summary-section">
        <h3>Summary</h3>
        <button onClick={calculateBalance}>Calculate Balances</button>
        {summary.length > 0 && (
          <ul>
            {summary.map((entry, index) => (
              <li key={index}>
                <span className="name">{entry.person}:</span>
                <span>{` Paid: ₹${entry.amountPaid.toFixed(2)} | Balance: ₹${entry.balance.toFixed(2)}`}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Share Report Section */}
      <div className="share-report-section">
        {summary.length > 0 && (
          <>
            <button onClick={copyReport}>Copy Report</button>
            <button onClick={shareReport}>Share via Email</button>
          </>
        )}
      </div>

      {/* Scroll-to-top button */}
      {showScrollButton && (
        <button
          className={`scroll-to-top-btn ${showScrollButton ? 'show' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          &#8593; Scroll to Top
        </button>
      )}
    </div>
  );
}

export default App;
