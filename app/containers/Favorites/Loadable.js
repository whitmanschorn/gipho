/**
 *
 * Asynchronously loads the component for Favorites
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
