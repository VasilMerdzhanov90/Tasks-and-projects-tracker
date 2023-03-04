import './Finished.css'
import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'

import translation from '../../translations/translation.json'

export default function Finished({ language }) {

  const { documents, error } = useCollection('projects', ['finished', '==', true])

  return (
    <div>
      <h2 className='finished'>{translation[language].finishedTasks}:</h2>
      {documents && <ProjectList projects={documents} language={language} />}
      {error && <p className='error'>{error}</p>}
    </div>
  )
}
