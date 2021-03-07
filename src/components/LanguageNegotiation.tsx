import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { setCookie, BASE_COOKIE_OPTIONS } from 'utils/cookies';

type LanguageNegotiationProps = {
  preferredLanguage: string;
};

const LanguageNegotiation: React.FC<LanguageNegotiationProps> = ({
  preferredLanguage,
}) => {
  const router = useRouter();
  useEffect(() => {
    if (router?.locale !== preferredLanguage) {
      setCookie(
        null,
        'language',
        router?.locale as string,
        BASE_COOKIE_OPTIONS,
      );
    }
  }, [preferredLanguage, router?.locale]);
  return null;
};

export default LanguageNegotiation;
