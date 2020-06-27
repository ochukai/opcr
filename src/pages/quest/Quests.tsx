import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, List, Tag } from 'antd';

import quests from '../../assets/json/quest.json';
import './quests.less';

import Area from './Area';
const { CheckableTag } = Tag;

function Quests() {
  const keys = Object.keys(quests);
  const first: string = keys[0];
  const [selected, setSelected] = useState(first);

  return (
    <div className="opcr-quest-list">
      <div className="titles">
        {
          keys.map((key, index) => {
            return (
              <CheckableTag
              key={index}
              checked={selected === key}
              onChange={checked => setSelected(key)}
              >
                {key}
              </CheckableTag>
            );
          })
        }
      </div>
      <Area title={selected} />
    </div>
  )
}

export default Quests;
