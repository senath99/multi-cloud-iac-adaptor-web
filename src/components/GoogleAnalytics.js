import { Helmet } from 'react-helmet-async';
import { googleAnalyticsConfig } from '../config';
import Hotjar from '@hotjar/browser';

// ----------------------------------------------------------------------

const GA_MEASUREMENT_ID = googleAnalyticsConfig;

export default function GoogleAnalytics() {
  const siteId = 3114857;
  const hotjarVersion = 6;
  Hotjar.init(siteId, hotjarVersion);

  return (
    <Helmet>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </script>
    </Helmet>
  );
}
