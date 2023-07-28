import {render, screen, waitFor} from '@testing-library/react';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import {Provider} from 'react-redux';
import LaunchesPage from './LaunchesPage';
import store from '../../store';

const server = setupServer(
  rest.post('https://api.spacexdata.com/v5/launches/query/', (req, res, ctx) => {
    return res(
      ctx.json({
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasNextPage: false,
        hasPrevPage: false,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('LaunchesPage', () => {
  test('renders loading state', async () => {
    server.use(
      rest.post('https://api.spacexdata.com/v5/launches/query/', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.json({
            docs: [],
            totalDocs: 0,
            totalPages: 0,
            page: 1,
            hasNextPage: false,
            hasPrevPage: false,
          })
        );
      })
    );

    render(
      <Provider store={store}>
        <LaunchesPage />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('spinner')).not.toBeInTheDocument();
    });
  });

});
