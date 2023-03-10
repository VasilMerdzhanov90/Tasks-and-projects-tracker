import './Create.css'

import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { projectStorage, timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

import translation from '../../translations/translation.json';

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
];


export default function Create({ language }) {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);

    const [formError, setFormError] = useState(null);

    const [users, setUsers] = useState([]);
    const [taskImage, setTaskImage] = useState(null);

    const [taskImageError, setTaskImageError] = useState('');

    const { documents } = useCollection('users');

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

    const handleImageUpload = (e) => {
        e.preventDefault()
        setTaskImageError('');
        const selected = e.target.files[0];

        if (!selected.type.includes('image')) {
            setTaskImageError('File must be an image!')
            return
        }
        setTaskImage(selected)
    }


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
            assignedUsersList,
            finished: false
        }

        if (taskImage != null) {
            const uploadPath = `taskImages/${project.dueDate}/${taskImage.name}`;
            const img = await projectStorage.ref(uploadPath).put(taskImage);

            const imgUrl = await img.ref.getDownloadURL();

            project.imgUrl = imgUrl;
        }

        await addDocument(project);

        if (!response.error) {
            navigate('/');
        }
    }

    return (

        <div className='create-form'>
            <h2 className='page-title'>{translation[language].createTask}</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>{translation[language].taskName}:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>{translation[language].taskDetails}:</span>
                    <textarea
                        className='text-area'
                        type="text"
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    />
                </label>
                <label>
                    <span>{translation[language].uploadImage}:</span>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                    />
                    {taskImageError && <p className='error'>{taskImageError}</p>}
                </label>
                <label>
                    <span>{translation[language].setDueDate}:</span>
                    <input
                        type="date"
                        required
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>{translation[language].taskCategory}:</span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>{translation[language].assignedUsers}:</span>
                    <Select
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>
                {formError && <p className='error'>{formError}</p>}
                <button className='btn'>{translation[language].addTaskBtn}</button>
            </form>
        </div>

    )
}
