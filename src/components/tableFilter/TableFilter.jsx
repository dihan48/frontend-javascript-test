import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    filterDataAsync
} from '../../slices/tableSlice';
import styles from './TableFilter.module.css';
export default function TableFilter() {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                dispatch(filterDataAsync(filter));
            }}
            className={styles.form}
        >
            <input
                type="text"
                onChange={(event) => setFilter(event.target.value)}
                value={filter}
            />
            <input type="submit" value="Найти" />
        </form>
    );
}