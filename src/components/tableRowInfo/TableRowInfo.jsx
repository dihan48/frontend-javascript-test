import { useSelector } from 'react-redux';
import {
    selectSourceData,
    selectSelectedSourceID
} from '../../slices/tableSlice';
import styles from './TableRowInfo.module.css';

export default function TableRowInfo() {
    const sourceData = useSelector(selectSourceData);
    const selectedSourceID = useSelector(selectSelectedSourceID);

    return selectedSourceID >= 0
        &&
        <RowInfo data={sourceData[selectedSourceID]} />;
};

function RowInfo({ data }) {
    return (
        <div className={styles.info}>
            <div className={styles.title}>
                Выбран пользователь
            </div>
            <div className={styles.value}>
                <b>{`${data?.firstName || ''} ${data?.lastName || ''}`}</b>
            </div>
            <div className={styles.title}>
                Описание:
            </div>
            <div className={styles.value}>
                <textarea defaultValue={data?.description || ''} />
            </div>
            <div className={styles.title}>
                Адрес проживания:
            </div>
            <div className={styles.value}>
                <b>{data?.address?.streetAddress || ''}</b>
            </div>
            <div className={styles.title}>
                Город:
            </div>
            <div className={styles.value}>
                <b>{data?.address?.city || ''}</b>
            </div>
            <div className={styles.title}>
                Провинция/штат:
            </div>
            <div className={styles.value}>
                <b>{data?.address?.state || ''}</b>
            </div>
            <div className={styles.title}>
                Индекс:
            </div>
            <div className={styles.value}>
                <b>{data?.address?.zip || ''}</b>
            </div>
        </div>
    );
}