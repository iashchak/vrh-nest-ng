/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import 'zone.js/node';
import './server/main';
export * from './src/main.server';
