import {render, screen} from '@testing-library/react';
import {getRandomImage} from '../../ulils/getRandomImage';
import Card from './Card';
import {ShortLaunchWithRocket} from '../../types/launches.types';

jest.mock('../../ulils/getRandomImage');

describe('Card', () => {
  const mockLaunchInfo: ShortLaunchWithRocket = {
    id: '1',
    rocket: {
      flickr_images: ['image1', 'image2'],
      name: 'Rocket name',
    },
    date_utc: '2017-10-30T19:34:00.000Z',
    name: 'Launch name',
    details: 'Launch details',
  };

  it('renders correctly', () => {
    render(<Card launchInfo={mockLaunchInfo} />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByAltText('Rocket name')).toBeInTheDocument();
    expect(screen.getByText('Rocket name')).toBeInTheDocument();
    expect(screen.getByText('30 October')).toBeInTheDocument();
    expect(screen.getByText('2017')).toBeInTheDocument();
    expect(screen.getByText('Launch name')).toBeInTheDocument();
    expect(screen.getByText('Launch details')).toBeInTheDocument();
  });
  it('does not render details when details is null', () => {
    const launchInfoWithoutDetails = {...mockLaunchInfo, details: null};
    render(<Card launchInfo={launchInfoWithoutDetails} />);

    expect(screen.queryByText('Launch details')).not.toBeInTheDocument();
  });

  it('calls getRandomImage with correct parameters', () => {
    render(<Card launchInfo={mockLaunchInfo} />);

    expect(getRandomImage).toHaveBeenCalledWith(mockLaunchInfo.rocket.flickr_images);
  });
});
