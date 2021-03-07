import { useI18n } from 'next-localization';

import FooterLink from 'components/FooterLink';

const Footer: React.FC = () => {
  const i18n = useI18n();

  return (
    <footer className='max-w-2xl mx-auto w-full pb-8 mt-16 px-4 md:px-0'>
      <hr className='w-full border-1 border-gray-200 dark:border-gray-800 mb-8' />
      <ul className='grid md:grid-cols-3 gap-y-10 px-8'>
        <li>
          <h3 className='mb-4 font-medium'>{i18n.t('footer.more')}</h3>
          <ul>
            <li>
              <FooterLink href='/'>{i18n.t('nav.home')}</FooterLink>
            </li>
          </ul>
        </li>
        <li>
          <h3 className='mb-4 font-medium'>{i18n.t('footer.media')}</h3>
          <ul>
            <li>
              <FooterLink href='https://twitter.com/wbeuil' external>
                Twitter
              </FooterLink>
            </li>
            <li>
              <FooterLink href='https://github.com/wbeuil' external>
                GitHub
              </FooterLink>
            </li>
            <li>
              <FooterLink href='https://www.linkedin.com/in/wbeuil' external>
                LinkedIn
              </FooterLink>
            </li>
          </ul>
        </li>
        <li>
          <h3 className='mb-4 font-medium'>{i18n.t('footer.links')}</h3>
          <ul>
            <li>
              <FooterLink href='mailto:william.beuil@gmail.com' external>
                Email
              </FooterLink>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
