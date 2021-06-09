import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectIsLoading,
    selectIsError,
    fetchDataAsync
} from '../../slices/tableSlice';
import { ShowFormButton } from '../tableAddDataForm/TableAddDataForm';
import TableFilter from '../tableFilter/TableFilter';
import TableHeader from '../tableHeader/TableHeader';
import TableBody from '../tableBody/TableBody';
import Loading from '../spiner/Spiner';
import Pagination from '../pagination/Pagination';
import TableRowInfo from '../tableRowInfo/TableRowInfo';
import styles from './Table.module.css';

export default function Table() {
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);
    const dispatch = useDispatch();
    useEffect(() => dispatch(fetchDataAsync()), [dispatch]);

    return (
        isLoading
            ?
            <Loading />
            :
            <>
                <div className={styles.header}>
                    <TableFilter />
                    <ShowFormButton />
                </div>
                <table border="1" className={styles.table}>
                    <TableHeader />
                    <TableBody />
                </table>
                {
                    isError
                    &&
                    <center>Ошибка получения данных</center>
                }
                <Pagination />
                <TableRowInfo />
            </>
    )
}