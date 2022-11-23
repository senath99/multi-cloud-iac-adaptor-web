import { googleAnalyticsConfig } from '../config';

// ----------------------------------------------------------------------

const setup = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  if (!window.gtag) {
    return;
  }
  window.gtag(...args);
};

const track = {
  pageview: (props) => {
    setup('config', googleAnalyticsConfig, {
      send_page_view: false,
      custom_map: { dimension1: 'user_client_name', dimension2: 'user_email' }
    });
    setup('event', 'page_view', {
      page_title: props.page_title,
      page_location: props.page_location,
      page_path: props.page_path,
      user_client_name: props.user_client_name,
      user_email: props.user_email
    });
  },
  event: (type, props) => {
    setup('event', type, props);
  }
};

export default track;
