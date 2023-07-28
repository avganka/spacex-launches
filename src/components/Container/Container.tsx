import { PropsWithChildren } from 'react';
import styles from './Container.module.css'

function Container({children}: PropsWithChildren) {
	return <div className={styles.container}>{children}</div>;
}

export default Container;
