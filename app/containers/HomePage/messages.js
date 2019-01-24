/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Search for gifs",
  },
  faves: {
    id: `${scope}.faves`,
    defaultMessage: "Faves",
  },
});
