/*
 * GifEntry Messages
 *
 * This contains all the text for the GifEntry component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.GifEntry';

export default defineMessages({
  save: {
    id: `${scope}.save`,
    defaultMessage: " Save",
  },
  unsave: {
    id: `${scope}.header`,
    defaultMessage: " UnSave",
  },
});
