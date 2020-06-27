import React, { useState } from 'react';
import { Avatar, Tooltip } from 'antd';

import equipments from '../../assets/json/equipment.json';
import avatars from '../equipmentImages';

function Equipment(props: any) {
  const defaultId = 999999;

  const {
    id = defaultId,
    size = 64,
  } = props;

  // console.log('equipment render - ', id);

  let avatarSrc: any = avatars[String(id)];
  if (!avatarSrc) {
    avatarSrc = avatars[String(defaultId)];
  }

  const item = equipments.filter(e => e.id === id)[0];
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

export default Equipment;
