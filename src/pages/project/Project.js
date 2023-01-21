import './Project.css'

import React from 'react'
import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';
import { useParams } from 'react-router-dom';

export default function Project() {

	const { id } = useParams();

	const { document, error } = useDocument('projects', id);

	return (
		<div>
			{error && <p className='error'>{error}</p>}
			{!document && <div className='loading'>Loading...</div>}
			{document &&
				<div className='project-details'>
					<ProjectSummary project={document} />
					<ProjectComments project={document} />
				</div>
			}
		</div>
	)
}
