import { useSelector, useDispatch } from 'react-redux';
import {
    selectData,
    selectPage,
    selectRowInPage,
    setPage
} from '../../slices/tableSlice';
import styles from './Pagination.module.css';

export default function TablePagination() {
    const data = useSelector(selectData);
    const page = useSelector(selectPage);
    const rowInPage = useSelector(selectRowInPage);
    const dispatch = useDispatch();

    if (!data?.length) return null;

    const pagesCount = Math.ceil(data.length / rowInPage);

    const handleClick = (numberPage) => {
        window.scrollTo(0, 0);
        dispatch(setPage(numberPage));
    }

    return <Pagination pagesCount={pagesCount} page={page} handleClick={handleClick} />;
}

function Pagination({ pagesCount, page, handleClick }) {
    const numbers = [];
    for (let i = 0; i < pagesCount; i++) {
        numbers.push(
            <span
                key={i}
                onClick={() => page !== i && handleClick(i)}
                className={
                    page === i
                        ? styles.pageNumberActive
                        : styles.pageNumber
                }
            >
                {i + 1}
            </span>
        )
    }
    return numbers.length > 1
        &&
        <div className={styles.pagination}>
            {numbers}
        </div>
}

export function usePaginatedTableData() {
    const data = useSelector(selectData);
    const page = useSelector(selectPage);
    const rowInPage = useSelector(selectRowInPage);
    return paginatedData(data, page, rowInPage);
}

function paginatedData(itemsArray, pageNumber, itemInPage) {
    let start = pageNumber * itemInPage;
    let end = start + itemInPage > itemsArray?.length ? itemsArray?.length : start + itemInPage;

    const pageData = [];
    for (let i = start; i < end; i++) {
        pageData.push(itemsArray[i])
    }

    return pageData;
}