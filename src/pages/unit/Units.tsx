import React, { useState } from 'react';

import Unit from '../../components/unit/Unit';
import units from '../../assets/json/unit.json';

import { Radio } from 'antd';
import { StarFilled } from '@ant-design/icons';

import './units.less';
import { useHistory } from 'react-router-dom';

function Units() {
  const history = useHistory();
  function handleClick(unit: any) {
    history.push(`/unit/${unit.id}`);
  }

  const [star, setStar] = useState(0);
  const [atk, setAtk] = useState(0);

  let dummy = star === 0
    ? units
    : units.filter(unit => unit.star === star);

  dummy = atk === 0
    ? dummy
    : dummy.filter(d => d.atk_type === atk);

  return (
    <div className="opcr-unit-list">
      <div className="filters">
        <div className="filter-item">
          <span className="label">星级</span>
          <Radio.Group onChange={e => setStar(e.target.value)} value={star}>
            <Radio value={1}><StarFilled/></Radio>
            <Radio value={2}><StarFilled/><StarFilled/></Radio>
            <Radio value={3}><StarFilled/><StarFilled/><StarFilled/></Radio>
            <Radio value={0}>全部</Radio>
          </Radio.Group>
        </div>
        <div className="filter-item">
          <span className="label">攻击类型</span>
          <Radio.Group onChange={e => setAtk(e.target.value)} value={atk}>
            <Radio value={1}>物理</Radio>
            <Radio value={2}>魔法</Radio>
            <Radio value={0}>全部</Radio>
          </Radio.Group>
        </div>
      </div>

      { dummy.map((unit, index) => <Unit key={index} id={unit.id} onClick={handleClick} />)}
    </div>
  );
}

export default Units;
