import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import { useI18n } from 'next-localization';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Nav from 'components/Nav';
import Footer from 'components/Footer';

import '@reach/skip-nav/styles.css';

type ContainerProps = {
  seo?: { [key: string]: string | string[] };
};

const Container: React.FC<ContainerProps> = ({ children, seo = {} }) => {
  const router = useRouter();
  const i18n = useI18n();

  const meta: { [key: string]: string } = {
    type: 'website',
    image: i18n.t('seo.image.url'),
    imageAlt: i18n.t('seo.image.alt'),
    ...seo,
  };

  const isEN = router?.locale === 'en';
  const isArticle = meta.type === 'article';
  const path = isEN ? router.asPath : `/fr${router.asPath}`;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
        <meta name='robots' content='index,follow' />
        <meta name='googlebot' content='index,follow' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta property='og:site_name' content='William Beuil' />
        <meta property='og:title' content={meta.title} />
        <meta property='og:description' content={meta.description} />
        <meta property='og:type' content={meta.type} />
        <meta property='og:image' content={meta.image} />
        <meta property='og:image:url' content={meta.image} />
        <meta property='og:image:secure_url' content={meta.image} />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:alt' content={meta.imageAlt} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='628' />
        <meta property='og:url' content={`https://wbeuil.com${path}`} />
        <meta property='og:locale' content={isEN ? 'en_US' : 'fr_FR'} />
        <meta
          property='og:locale:alternate'
          content={isEN ? 'fr_FR' : 'en_US'}
        />
        {isArticle && (
          <>
            <meta
              property='article:published_time'
              content={new Date(meta.publishedAt).toISOString()}
            />
            {meta.modifiedAt && (
              <meta
                property='article:modified_time'
                content={new Date(meta.modifiedAt).toISOString()}
              />
            )}
            <meta property='article:author' content='William Beuil' />
            {(meta.tags as unknown as string[]).map((tag) => (
              <meta key={tag} property='article:tag' content={tag} />
            ))}
          </>
        )}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@wbeuil' />
        <meta name='twitter:creator' content='@wbeuil' />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:image' content={meta.image} />
        <meta name='twitter:image:alt' content={meta.imageAlt} />
        <link rel='canonical' href={`https://wbeuil.com${path}`} />
        <link
          rel='alternate'
          href={`https://wbeuil.com${
            isArticle && meta.locale !== 'en' ? meta.alternate : router.asPath
          }`}
          hrefLang='en'
        />
        <link
          rel='alternate'
          href={`https://wbeuil.com/fr${
            isArticle && meta.locale !== 'fr' ? meta.alternate : router.asPath
          }`}
          hrefLang='fr'
        />
        <link
          rel='alternate'
          href={`https://wbeuil.com${
            isArticle && meta.locale !== 'en' ? meta.alternate : router.asPath
          }`}
          hrefLang='x-default'
        />
        <link
          rel='alternate'
          type='application/atom+xml'
          href={`/${isEN ? 'en' : 'fr'}.feed.xml`}
          title={i18n.t(`seo.rss.${isEN ? 'en' : 'fr'}`)}
        />
        <link
          rel='manifest'
          href={`/favicons/${isEN ? 'en' : 'fr'}.site.webmanifest`}
        />
      </Head>
      <SkipNavLink>{i18n.t('a11y.skipContent')}</SkipNavLink>
      <Nav alternate={isArticle ? meta.alternate : router.asPath} />
      <SkipNavContent />
      <main className='flex flex-col justify-center items-center px-4 sm:px-6 md:px-8'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Container;
