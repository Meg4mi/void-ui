// tslint:disable:no-any
// tslint:disable:no-unsafe-any

import axios, { AxiosResponse } from 'axios';

export const API_URL: string = '/graphql';

/**
 * GraphQL API
 */
// tslint:disable-next-line:typedef
const graphql = {
  /**
   * Query Game
   */
  game: async (id: number): Promise<Game> => {
    const response: AxiosResponse<Game> = await axios.post<Game>(API_URL, {
      query: `
{
  game(id: 1005) {
    id
    name
    category
    names {
      content
      lang
    }
    summary_text
    storyline_text
    covers {
      desc
      format
      height
      index
      path
      size
      src
      type
      width
    }
  }
}
`,
    });

    return response.data;
  },

  /**
   * Query collection
   */
  getCollection: async (
    modelName: NameOfCollectionModel,
    id: number,
    skip: number,
  ): Promise<Collection> => {
    const response: AxiosResponse<Collection> = await axios.post<Collection>(API_URL, {
      query: `
{
  ${modelName}(id: ${id}) {
    id
    name
    desc
    size
    games(skip: ${skip}) {
      id
      name
      names {
        content
        lang
      }
      covers {
        src
      }
    }
  }
}
`,
    });

    return response.data;
  },

  /**
   * Query collection
   */
  collection: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('collection', id, skip),

  /**
   * Query franchise
   */
  franchise: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('franchise', id, skip),

  /**
   * Query developer
   */
  developer: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('developer', id, skip),

  /**
   * Query publisher
   */
  publisher: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('publisher', id, skip),

  /**
   * Query game_engine
   */
  game_engine: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('game_engine', id, skip),

  /**
   * Query platform
   */
  platform: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('platform', id, skip),

  /**
   * Query genre
   */
  genre: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('genre', id, skip),

  /**
   * Query theme
   */
  theme: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('theme', id, skip),

  /**
   * Query game_mode
   */
  game_mode: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('game_mode', id, skip),

  /**
   * Query player_perspective
   */
  player_perspective: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('player_perspective', id, skip),

  /**
   * Query keyword
   */
  keyword: async (id: number, skip: number = 0): Promise<Collection> =>
    graphql.getCollection('keyword', id, skip),
};

export default graphql;
