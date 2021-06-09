import { useDispatch } from 'react-redux';
import { setApilvl } from '../../slices/tableSlice'
import styles from './ApiSelection.module.css';

export default function ApiSelection() {
    const dispatch = useDispatch();
    return (
        <div className={styles.center}>
            <button className={styles.button} onClick={() => dispatch(setApilvl('low'))}>мало данных</button>
            <button className={styles.button} onClick={() => dispatch(setApilvl('high'))}>много данных</button>
        </div>
    );
}