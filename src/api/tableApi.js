/*
    SSL сертификат сайта filltext.com выдан для домена *.herokuapp.com 
    DNC запись домена www.filltext.com: CNAME filltext.herokuapp.com
    Для использования шифрования в запросах был изменеи исходный адрес API на filltext.herokuapp.com
    Это ни как не влияет на работу приложения так как запросы идут на один и тот же сервер
*/
const urls = {
    low: 'https://filltext.herokuapp.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
    high: 'https://filltext.herokuapp.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
}
const defaultUrl = urls.low;

export function fetchData(apilvl) {
    const url = urls[apilvl] || defaultUrl;
    return new Promise((resolve) =>
        fetch(url)
            .then(response => response.json())
            .then(data => {
                resolve({ data });
            })
            .catch((err) => {
                console.error(err);
                resolve({ error: true, data: [] });
            })
    );
}