import styles from './Spinner.module.css';

function Spinner() {
	return (
		<div className={styles.spinnerWrapper} data-testid='spinner'>
			<div className={styles.spinner}></div>
		</div>
	)
}

export default Spinner;
