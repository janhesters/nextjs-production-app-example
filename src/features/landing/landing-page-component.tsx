import { Anchor, Heading, Main } from './landing-page-component-styles';

const LandingPageComponent = () => (
  <Main>
    <Heading>
      Hello, Welcome to{' '}
      <Anchor
        href="https://janhesters.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        janhesters.com
      </Anchor>
      !
    </Heading>
  </Main>
);

export default LandingPageComponent;
