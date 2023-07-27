import {useState} from 'react';
import styles from './Launches.module.css';
import {useGetLaunchesWithRocketQuery} from '../../store/api';
import Card from '../../components/Card/Card';
import Container from '../../components/Container/Container';
import PlanetImage from '../../assets/planet.png';
import ArrowIcon from '../../assets/arrow.svg';
import {AnimatePresence, motion} from 'framer-motion';
import Spinner from '../../components/Spinner/Spinner';

export type Sort = 'asc' | 'desc';

function LaunchesPage() {
  const startYear = 2015;
  const endYear = 2019;
  const [sort, setSort] = useState<Sort>('asc');

  const {data, isLoading, isError, error} = useGetLaunchesWithRocketQuery({
    query: {
      date_utc: {
        $gte: new Date(`${startYear}-01-01`).toISOString(),
        $lte: new Date(`${endYear}-12-31`).toISOString(),
      },
    },
    sort: sort,
  });

  const toggleSort = () => {
    if (sort === 'asc') {
      setSort('desc');
    } else {
      setSort('asc');
    }
  };

  if (isError && 'status' in error) {
    return (
      <Container>
        <motion.h1
          className={styles.title}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5, delay: 0.5}}
        >
          {`Please reload the page. ${error.status}`}
        </motion.h1>
      </Container>
    );
  }

  return (
    <Container>
      <motion.h1
        className={styles.title}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5, delay: 0.5}}
      >
        SpaceX launches <br /> from <span>{startYear}</span> to <span>{endYear}</span>
      </motion.h1>
      <motion.img
        className={styles.planet}
        src={PlanetImage}
        alt='Earth'
        initial={{opacity: 0, x: '-50%', y: '-50%', scale: 0.4}}
        animate={{opacity: 1, x: '40%', y: '-50%', scale: 1}}
        transition={{duration: 1, delay: 0.5, easings: 'cubic-bezier(0.57, 0.21, 0.69, 1.25)'}}
      />
      <motion.div
        className={styles.content}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5, delay: 1}}
        exit={{opacity: 0}}
      >
        <button className={styles.button} onClick={toggleSort}>
          Sort
          <img src={ArrowIcon} alt='Arrow' className={sort === 'desc' ? styles.rotate : ''} />
        </button>
        <div className={styles.cardList}>
          {!isLoading ? (
            <AnimatePresence>
              {data?.docs.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{scale: 0, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  exit={{scale: 0, opacity: 0}}
                  transition={{stiffness: 200, damping: 20}}
                >
                  <Card key={doc.id} launchInfo={doc} />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <Spinner />
          )}
        </div>
      </motion.div>
    </Container>
  );
}

export default LaunchesPage;
