/// <reference types="cypress" />
// ***********************************************************
// For more on plugins can read here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing).

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

import { encryptSession } from 'utils/sessions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pluginConfig: Cypress.PluginConfig = (on, config) => {
  on('task', {
    // In @hapi/iron there is a call to crypto which is a Node library, so we
    // needed to make encryptSession a task.
    // https://docs.cypress.io/api/commands/task.html#Syntax
    encryptSession: (session: {
      issuer: string;
      publicAddress: string;
      email: string;
    }) => encryptSession(session),
  });
};

export default pluginConfig;
