import React from 'react';

function ShareableReport({ members, expenses }) {
    const generateReport = () => {
        let report = "Expense Summary:\n\n";
        const balances = members.map(member => {
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
        balances.forEach(balance => {
            const member = members.find(m => m.id === balance.memberId);
            report += `${member.name} owes: ₹${balance.amountOwed.toFixed(2)}\n`;
        });
        return report;
    };

    const handleShare = () => {
        const report = generateReport();
        navigator.clipboard.writeText(report).then(() => {
            alert("Report copied to clipboard!");
        });
    };

    return (
        <div>
            <h3>Shareable Report</h3>
            <button onClick={handleShare}>Copy Report</button>
        </div>
    );
}

export default ShareableReport;
