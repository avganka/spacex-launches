import {ShortLaunchWithRocket} from '../../types/launches.types';
import {getRandomImage} from '../../ulils/getRandomImage';
import {format} from 'date-fns';
import styles from './Card.module.css';

interface CardProps {
  launchInfo: ShortLaunchWithRocket;
}

function Card({launchInfo}: CardProps) {
  return (
    <div className={styles.card} data-testid='card'>
      <img
        loading='lazy'
        className={styles.image}
        src={getRandomImage(launchInfo.rocket.flickr_images)}
        alt={launchInfo.rocket.name}
      />
      <p className={styles.rocketName}>{launchInfo.rocket.name}</p>

      <p className={styles.date}>
        {format(new Date(launchInfo.date_utc), 'dd MMMM ')}
        <span>{format(new Date(launchInfo.date_utc), 'yyyy')}</span>
      </p>
      <div className={styles.info}>
        <h2 className={styles.title}>{launchInfo.name}</h2>
        {launchInfo.details && <p className={styles.details}>{launchInfo.details}</p>}
      </div>
    </div>
  );
}

export default Card;
