/*
 * Favorites Messages
 *
 * This contains all the text for the Favorites container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Favorites';

export default defineMessages({
  back: {
    id: `${scope}.back`,
    defaultMessage: "back to search",
  },
  savedCount: {
    id: `${scope}.savedCount`,
    defaultMessage: "saved images",
  },
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: "Search Saved Gifs",
  },
  go: {
    id: `${scope}.go`,
    defaultMessage: "go",
  }
});
