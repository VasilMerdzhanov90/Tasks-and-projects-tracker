import { useEffect, useState } from 'react'
import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import './Finished.css'

export default function Finished({ currentUser }) {

  const [lang, setLang] = useState('');

  useEffect(() => {
    if (currentUser) {
      setLang(currentUser.userSettings.language)
    }
  }, [currentUser])

  const { documents, error } = useCollection('projects', ['finished', '==', true])

  return (
    <div>
      <h2 className='finished'>Finished tasks:</h2>
      {documents && <ProjectList projects={documents} lang={lang} />}
      {error && <p className='error'>{error}</p>}
    </div>
  )
}
