import { getDate, getMonth, getYear } from 'date-fns';

export default function DueDateFilter({ projects, projectsSetter }) {

    const monthEnum = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',]

    const handleDateFilter = (e) => {
        const filteredResult = projects.filter((x) => {
            const dateFromDocument = getDate(x.dueDate.seconds * 1000);
            const monthFromDocument = getMonth(x.dueDate.seconds * 1000);
            const yearFromDocument = getYear(x.dueDate.seconds * 1000);

            const timeTemplate = `${yearFromDocument}-${monthEnum[monthFromDocument]}-${dateFromDocument}`;

            return timeTemplate === e.target.value;
        })
        projectsSetter(filteredResult);
    }
    const handleResetByDate = () => {
        projectsSetter('reset');

    }

    return (
        <label className='filter-label'>
            <span>Select due date to filter:</span>
            <input
                className='input-date'
                type="date"
                onChange={handleDateFilter}
            />
            <button className='btn'
                onClick={handleResetByDate}
            >RESET</button>
        </label >
    )
}
