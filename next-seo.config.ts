import type { DefaultSeoProps } from 'next-seo';

const defaultSeoProps: DefaultSeoProps = {
  title: 'My App',
  description: 'My cool app that I build using a tutorial from janhesters.com.',
  canonical: 'https://my-app.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.my-app.com/',
    site_name: 'My App',
  },
  twitter: {
    handle: '@janhesters',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default defaultSeoProps;
