/*
 * Project: Dynamedics Portal Web
 * Created Date: Sunday May 16th 2021
 * Author: Nalinda Wijayagunawardhane
 * -----
 * Last Modified: Sunday May 16th 2021 1:16:59 pm
 * Modified By: Nalinda Wijayagunawardhane at <nwijayagunawardhane@mitrai.com>
 * -----
 * Copyright (c) 2021 Mitra Sparks
 * -----
 * HISTORY:
 */

import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import SidebarItem from './SidebarItem';
// utils

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

// ----------------------------------------------------------------------

function reduceChild({ array, item, pathname, level, roles }) {
  const key = item.href + level;

  if (item.items) {
    const match = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    return [
      ...array,
      <SidebarItem
        key={key}
        level={level}
        icon={item.icon}
        info={item.info}
        href={item.href}
        title={item.title}
        open={Boolean(match)}
      >
        {renderSidebarItems({
          pathname,
          level: level + 1,
          items: item.items,
          roles: roles,
          icon: item.icon
        })}
      </SidebarItem>
    ];
  }
  if ((roles || []).includes(item.role)) {
    return [
      ...array,
      <SidebarItem
        key={key}
        level={level}
        href={item.href}
        icon={item.icon}
        info={item.info}
        title={item.title}
      />
    ];
  }
  return [...array];
}

function renderSidebarItems({ items, pathname, level = 0, roles }) {
  return (
    <List disablePadding sx={{ pl: level === 0 ? 2 : 1, color: 'white' }}>
      {items.reduce(
        (array, item) => reduceChild({ array, item, pathname, level, roles }),
        []
      )}
    </List>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar() {
  return <RootStyle className={'sidebar'}></RootStyle>;
}
