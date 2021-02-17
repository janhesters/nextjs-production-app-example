import type { TFunction } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { Fragment } from 'react';

import { Anchor, Heading, Main } from './landing-page-component-styles';

type LandingPageProps = {
  t: TFunction;
};

const LandingPageComponent = ({ t }: LandingPageProps) => (
  <Fragment>
    <NextSeo title={t('common:appName')} />

    <Main>
      <Heading>
        {t('landing:welcome-to') + ' '}
        <Anchor
          href="https://janhesters.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('common:appName')}
        </Anchor>
        !
      </Heading>
    </Main>
  </Fragment>
);

export default LandingPageComponent;
