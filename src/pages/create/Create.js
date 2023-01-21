import './Create.css'

import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';


const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
];


export default function Create() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);

    const [formError, setFormError] = useState(null);

    const [users, setUsers] = useState([]);

    const { documents, error } = useCollection('users');

    const { user } = useAuthContext();
    const { addDocument, response } = useFirestore('projects');

    //adding users in the setUsers for the SELECT
    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            });
            setUsers(options);
        }

    }, [documents])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        if (!category) {
            setFormError('Please select a project category!')
            return
        };
        if (assignedUsers.length === 0) {
            setFormError('Please select at least one user for the assignment!')
            return
        };

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        };

        const assignedUsersList = assignedUsers.map((user) => {
            return {
                displayName: user.value.displayName,
                photoURL: user.value.photoURL,
                id: user.value.id
            }
        });

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        await addDocument(project);
        if (!response.error) {
            navigate('/');
        }
    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>Create a new Project</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea
                        type="text"
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    />
                </label>
                <label>
                    <span>Set due date:</span>
                    <input
                        type="date"
                        required
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project category:</span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>Assigned users:</span>
                    <Select
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>
                {formError && <p className='error'>{formError}</p>}
                <button className='btn'>Add project</button>
            </form>
        </div>
    )
}
