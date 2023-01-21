import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import './Finished.css'

export default function Finished() {

  const { documents, error } = useCollection('projects', ['finished', '==', true])

  return (
    <div>
      <h2 className='finished'>Finished tasks:</h2>
      {documents && <ProjectList projects={documents} status='completed' />}
      {error && <p className='error'>{error}</p>}
    </div>
  )
}
