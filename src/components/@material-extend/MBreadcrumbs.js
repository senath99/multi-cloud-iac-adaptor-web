/*
 * Project: Dynamedics Portal Web
 * Created Date:
 * Author:
 * -----
 * Last Modified:Thursday November 4th 2021 2:06:11 pm
 * Modified By: Senath Weerasinghe at <senathweerasinghe@mitrai.com>
 * -----
 * Copyright (c) 2021 Mitra Sparks
 * -----
 * HISTORY:
 * 2021-11-04	SS	Added index as the key prop to listActiveLast.
 */

import { last } from 'lodash';
import PropTypes from 'prop-types';
// material
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Box, Link, Breadcrumbs } from '@material-ui/core';

// ----------------------------------------------------------------------

const Separator = (
  <Box
    component="span"
    sx={{
      width: 4,
      height: 4,
      borderRadius: '50%',
      bgcolor: 'text.disabled'
    }}
  />
);

LinkItem.propTypes = {
  link: PropTypes.object
};

function LinkItem({ link }) {
  const { href, name, icon } = link;
  return (
    <Link
      to={href}
      key={name}
      variant="body2"
      component={RouterLink}
      sx={{
        lineHeight: 2,
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        '& > div': { display: 'inherit' }
      }}
    >
      {icon && (
        <Box
          sx={{
            mr: 1,
            '& svg': { width: 20, height: 20 }
          }}
        >
          {icon}
        </Box>
      )}
      {name}
    </Link>
  );
}

MBreadcrumbs.propTypes = {
  links: PropTypes.array.isRequired,
  activeLast: PropTypes.bool,
  maxWidth: PropTypes.number
};

export default function MBreadcrumbs({
  links,
  activeLast = false,
  maxWidth = 260,
  ...other
}) {
  const currentLink = last(links).name;

  const listDefault = links.map((link) => (
    <LinkItem key={link.name} link={link} />
  ));
  const listActiveLast = links.map((link, index) => (
    <div key={index}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: maxWidth,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: 'text.disabled',
            textOverflow: 'ellipsis'
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <Breadcrumbs separator={Separator} {...other}>
      {activeLast ? listDefault : listActiveLast}
    </Breadcrumbs>
  );
}
