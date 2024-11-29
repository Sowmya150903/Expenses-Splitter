import React, { useState } from 'react';

function AddExpense({ members, expenses, setExpenses }) {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [paidBy, setPaidBy] = useState("");
    const [participants, setParticipants] = useState([]);

    const handleAddExpense = () => {
        if (amount && description && paidBy && participants.length) {
            setExpenses([
                ...expenses,
                { amount: parseFloat(amount), description, paidBy, participants }
            ]);
            setAmount("");
            setDescription("");
            setPaidBy("");
            setParticipants([]);
        }
    };

    return (
        <div>
            <h3>Add Expense</h3>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in ₹"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <select
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
            >
                <option value="">Select Payer</option>
                {members.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                ))}
            </select>
            <div>
                <label>Participants</label>
                {members.map(member => (
                    <div key={member.id}>
                        <input
                            type="checkbox"
                            value={member.id}
                            onChange={(e) => {
                                setParticipants(prev => {
                                    const selected = [...prev];
                                    if (e.target.checked) {
                                        selected.push(member.id);
                                    } else {
                                        const index = selected.indexOf(member.id);
                                        if (index > -1) selected.splice(index, 1);
                                    }
                                    return selected;
                                });
                            }}
                        />
                        {member.name}
                    </div>
                ))}
            </div>
            <button onClick={handleAddExpense}>Add Expense</button>
        </div>
    );
}

export default AddExpense;
