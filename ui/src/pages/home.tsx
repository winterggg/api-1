import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import { useQuery, gql } from '@apollo/client'

import NoteFeed from '../components/NoteFeed'
import Button from '../components/Button';

const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

// center div
const Center = styled.div`
  display: flex;
  justify-content: center;
`;


const Home = () => {

  const { data, loading, error, fetchMore } = useQuery(GET_NOTES)

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return (
    <>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        // todo: read more about this
        <Center>
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  cursor: data.noteFeed.cursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  return {
                    noteFeed: {
                      cursor: fetchMoreResult.noteFeed.cursor,
                      hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                      // combine the new results and the old
                      notes: [
                        ...previousResult.noteFeed.notes,
                        ...fetchMoreResult.noteFeed.notes
                      ],
                      __typename: 'noteFeed'
                    }
                  };
                }
              })
            }
          >
            Load more
          </Button>
        </Center>
      )}
    </>
  )
}

export default Home