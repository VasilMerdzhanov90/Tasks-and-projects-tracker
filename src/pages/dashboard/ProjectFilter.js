import translation from '../../translations/translation.json';



export default function ProjectFilter({ currentFilter, changeFilter, language }) {
    const filterList = translation[language].filterList;

    const handleClick = (newFilter) => {
        changeFilter(newFilter);
    }


    return (
        <div className="project-filter">
            <nav>
                <p>Filter:</p>
                {
                    filterList.map((f) => (
                        <button
                            key={f}
                            className={currentFilter === f ? 'active' : ''}
                            onClick={() => handleClick(f)}
                        >{f}</button>
                    ))}

            </nav>
        </div>
    )
}
