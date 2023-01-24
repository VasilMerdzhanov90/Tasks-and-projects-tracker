const filterList = ['all', 'assigned', 'date', 'development', 'design', 'marketing', 'sales', 
// 'todays tasks' <-- TODO!!!!
];

export default function ProjectFilter({ currentFilter, changeFilter }) {


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
