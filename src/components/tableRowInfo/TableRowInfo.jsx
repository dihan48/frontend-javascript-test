import { useSelector } from 'react-redux';
import {
    selectSourceData,
    selectSelectedSourceID
} from '../../slices/tableSlice';

export default function TableRowInfo() {
    const sourceData = useSelector(selectSourceData);
    const selectedSourceID = useSelector(selectSelectedSourceID);

    return selectedSourceID >= 0
        &&
        <RowInfo data={sourceData[selectedSourceID]} />;
};

function RowInfo({ data }) {
    return (
        <div>
            <div>
                Выбран пользователь <b>{`${data?.firstName || ''} ${data?.lastName || ''}`}</b>
            </div>
            <div>
                Описание: <textarea defaultValue={data?.description || ''} />
            </div>
            <div>
                Адрес проживания: <b>{data?.address?.streetAddress || ''}</b>
            </div>
            <div>
                Город: <b>{data?.address?.city || ''}</b>
            </div>
            <div>
                Провинция/штат: <b>{data?.address?.state || ''}</b>
            </div>
            <div>
                Индекс: <b>{data?.address?.zip || ''}</b>
            </div>
        </div>
    );
}