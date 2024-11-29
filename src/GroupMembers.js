import React, { useState } from 'react';

function GroupMembers({ members, setMembers }) {
    const [name, setName] = useState("");

    const addMember = () => {
        if (name && !members.some(member => member.name === name)) {
            setMembers([...members, { name, id: members.length + 1 }]);
            setName("");
        }
    };

    return (
        <div>
            <h3>Group Members</h3>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter member's name"
            />
            <button onClick={addMember}>Add Member</button>
            <ul>
                {members.map(member => (
                    <li key={member.id}>{member.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default GroupMembers;
