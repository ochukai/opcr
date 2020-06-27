import React, { useState } from 'react';

import quests from '../../assets/json/quest.json';

import { Tag, Card } from 'antd';

import './quest.less';
import Equipment from '../../components/equip/Equipment';
import Item from '../../components/item/Item';

function Quest(props: any) {
  const {
    area,
    id,
  } = props;

  const maps: Array<any> = (quests as any)[area];
  const map = maps.filter(m => m.id === id)[0];

  const title = (
    <span>
      {map.areaNo}
      {map.type === 12 ? <Tag style={{marginLeft: 10}} color="#cd201f">hard</Tag> : null}
    </span>
  );

  return (
    <Card
      className="opcr-quest"
      size="small"
      title={title}
      hoverable={true}
    >
      {map.id1 && <Equipment size={64} id={map.id1} />}
      {map.id2 && <Equipment size={64} id={map.id2} />}
      {map.id3 ? <Item size={64} id={map.id3} /> : ''}
    </Card>
  );
}

export default Quest;
