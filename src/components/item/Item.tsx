import React, { useState } from 'react';
import { Avatar, Tooltip } from 'antd';

import items from '../../assets/json/item.json';
import avatars from '../itemImages';

function Item(props: any) {
  const {
    id,
    size = 64,
  } = props;

  let avatarSrc: any = avatars[String(id)];

  const item = items.filter(e => e.id === id)[0];
  if (!item) {
    console.log('item undefined', id);
  }

  return (
    <Tooltip placement="top" title={item ? item.name : ''}>
      <Avatar
        className="opcr-avatar"
        size={size}
        shape="square"
        src={avatarSrc}
      />
    </Tooltip>
  );
}

export default Item;
