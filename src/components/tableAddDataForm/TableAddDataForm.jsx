import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRow } from '../../slices/tableSlice';
import styles from './TableAddDataForm.module.css';
import { formModel } from './FormModel';

export function ShowFormButton() {
    const [isShowForm, setIsShowForm] = useState(false);
    return (
        <>
            <button
                className={styles.showFormButton}
                onClick={() => setIsShowForm(!isShowForm)}
            >
                Добавить
            </button>
            {
                isShowForm
                &&
                <Form setIsShowForm={setIsShowForm} />
            }
        </>
    );
}
function Form({ setIsShowForm }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialFormData());
    const [isActiveButton, setIsActiveButton] = useState(false);
    return (
        <form className={styles.form} onSubmit={(event) => {
            event.preventDefault();
            setIsShowForm(false);
            const newRow = {};
            for (const key in formData) {
                newRow[key] = formData[key]?.value;
            }
            dispatch(addRow(newRow));
        }}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {
                            formModel.map(({ key, name }) =>
                                <th key={key} >
                                    {name}
                                </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            formModel.map(({ key, placeholder, dataType }) =>
                                <td key={key} className={styles.td}>
                                    <input
                                        type="text"
                                        placeholder={placeholder}
                                        onChange={(event) => handleFormChange(event, key, dataType, formData, setFormData, setIsActiveButton)}
                                        value={formData[key]?.value || ''}
                                        className={(() => {
                                            if (formData[key]?.valid === null)
                                                return `${styles.input}`
                                            if (formData[key]?.valid)
                                                return `${styles.input} ${styles.valid}`
                                            else
                                                return `${styles.input} ${styles.invalid}`
                                        })()}
                                    />
                                </td>
                            )
                        }
                    </tr>
                </tbody>
            </table>
            <input
                type="submit"
                value="Добавить в таблицу"
                disabled={!isActiveButton}
                className={styles.submit}
            />
        </form>
    );
}


function initialFormData() {
    const initialFormData = {};
    formModel.forEach(item => initialFormData[item.key] = { valid: null, value: '' });
    return initialFormData;
}

function handleFormChange(event, key, dataType, formData, setFormData, setIsActiveButton) {
    let value = event.target.value;
    let valid = true;
    if (changeRegExp[dataType] instanceof RegExp) {
        value = changeRegExp[dataType].test(value) ? value : formData[key]?.value;
    }
    if (validateRegExp[dataType] instanceof RegExp) {
        valid = validateRegExp[dataType].test(value);
    }
    const newFormData = { ...formData, [key]: { value, valid } };
    setFormData({ ...formData, [key]: { value, valid } });
    setIsActiveButton(Object.values(newFormData).reduce((total, current) => total && current.valid, true));
}

const changeRegExp = {
    number: /^[0-9]{0,8}$/,
    word: /^[a-zA-Z]{0,20}$/,
    email: /^[a-zA-Z@0-9.\-_]{0,30}$/,
    phone: /^[0-9()-]{0,13}$/,
}

const validateRegExp = {
    number: /^[0-9]{1,8}$/,
    word: /^[a-zA-Z]{1,20}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^\(\d{3}\)\d{3}-\d{4}$/,
}