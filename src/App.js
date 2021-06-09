import { useSelector } from 'react-redux';
import Table from './components/table/Table';
import { selectApilvl } from './slices/tableSlice';
import ApiSelection from './components/apiSelection/ApiSelection';
import styles from './App.module.css';

function App() {
  const apilvl = useSelector(selectApilvl);
  return (
    <div className={styles.container}>
      {
        apilvl 
        ?
        <Table />
        :
        <ApiSelection/>
      }
      
    </div>
  );
}

export default App;