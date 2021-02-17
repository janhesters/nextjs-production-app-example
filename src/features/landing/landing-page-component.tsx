import type { TFunction } from 'next-i18next';

import { Anchor, Heading, Main } from './landing-page-component-styles';

type LandingPageProps = {
  t: TFunction;
};

const LandingPageComponent = ({ t }: LandingPageProps) => (
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
);

export default LandingPageComponent;
