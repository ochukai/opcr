import React from 'react';
import { Avatar, Tooltip } from 'antd';
import classnames from 'classnames';

import units from '../../assets/json/unit.json';
import avatars from '../unitImages';

import './unit.less';

function Unit(props: any) {
  const {
    id,
    star = 3,
    size = 64,
    checkable = false, // 是否可以选中
    checked = false, // 是否已经选中
  } = props;

  const defaultId = id + 30;
  let avatarId: number;
  switch (star) {
    case 1:
      avatarId = id + 10;
      break;
    case 3:
      avatarId = defaultId;
      break;
    case 6:
      avatarId = id + 60;
      break;
    default:
      avatarId = defaultId;
      break;
  }

  let avatarSrc: any = avatars[String(avatarId)];
  if (!avatarSrc) {
    avatarSrc = avatars[String(defaultId)];
  }

  const item = units.filter(u => u.id === id)[0];

  const handleClick = () => {
    props.onClick && props.onClick(item);
  };

  const clazzNames = classnames({
    'unit-wrapper': true,
    'unit-checkable': checkable,
    'checked': checked,
  });

  return (
    <div className={clazzNames} onClick={handleClick}>
      <Tooltip placement="top" title={item.name}>
        <Avatar
          className="opcr-avatar"
          size={size}
          shape="square"
          src={avatarSrc}
          />
      </Tooltip>
    </div>
  );
}

export default Unit;
