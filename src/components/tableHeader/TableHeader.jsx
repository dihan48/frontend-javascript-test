import { useSelector, useDispatch } from 'react-redux';
import {
    selectSortColumn,
    selectSortDirection,
    sortAsync
} from '../../slices/tableSlice';
import { columns } from '../table/TableModel';
import styles from './TableHeader.module.css';

export default function TableHeader() {
    const dispatch = useDispatch();
    const sortColumn = useSelector(selectSortColumn);
    const sortDirection = useSelector(selectSortDirection);
    return (
        <thead>
            <tr className={styles.tr}>
                {
                    columns.map(({ key, name }) =>
                        <th
                            key={key}
                            onClick={() => dispatch(sortAsync(key))}
                            className={
                                sortColumn === key
                                    ? sortDirection === 1
                                        ? `${styles.th} ${styles.sort}`
                                        : `${styles.th} ${styles.sortDown}`
                                    : `${styles.th}`
                            }
                        >
                            {name}
                        </th>
                    )
                }
            </tr>
        </thead>
    );
}