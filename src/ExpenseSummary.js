import React, { useState, useEffect } from 'react';

function ExpenseSummary({ members, expenses }) {
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        const newBalances = members.map(member => {
            let owed = 0;
            expenses.forEach(expense => {
                if (expense.paidBy === member.id) {
                    owed += expense.amount / expense.participants.length;
                }
                if (expense.participants.includes(member.id) && expense.paidBy !== member.id) {
                    owed -= expense.amount / expense.participants.length;
                }
            });
            return { memberId: member.id, amountOwed: owed };
        });
        setBalances(newBalances);
    }, [members, expenses]);

    return (
        <div>
            <h3>Expense Summary</h3>
            {balances.map(balance => {
                const member = members.find(m => m.id === balance.memberId);
                return (
                    <div key={balance.memberId}>
                        {member.name} owes: ₹{balance.amountOwed.toFixed(2)}
                    </div>
                );
            })}
        </div>
    );
}

export default ExpenseSummary;
