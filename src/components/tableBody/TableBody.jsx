import { useSelector, useDispatch } from 'react-redux';
import {
    selectSelectedSourceID,
    setSelectedSourceID
} from '../../slices/tableSlice';
import { columns } from '../table/TableModel';
import { usePaginatedTableData } from '../pagination/Pagination';
import styles from './TableBody.module.css';

export default function TableBody() {
    const data = usePaginatedTableData();
    const selectedRow = useSelector(selectSelectedSourceID);
    const dispatch = useDispatch();

    return (
        <tbody>
            {
                data.map(item =>
                    <tr key={item.sourceID} className={selectedRow === item.sourceID ? styles.selectRow : ''}>
                        {
                            columns.map(({ key }) =>
                                <td key={key} onClick={() => dispatch(setSelectedSourceID(item.sourceID))}>
                                    {item[key]}
                                </td>
                            )
                        }
                    </tr>
                )
            }
        </tbody>
    );
}