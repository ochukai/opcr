import React, { useState } from 'react';

import { Radio } from 'antd';

import Equipment from '../../components/equip/Equipment';
import equipments from '../../assets/json/equipment.json';

import './equip.less';

function Equipments() {
  const [level, setLevel] = useState(4);
  const [draft, setDraft] = useState(1);

  let dummy = level === 0
    ? equipments
    : equipments.filter(eq => eq.level === level);

  dummy = draft === -1
    ? dummy
    : dummy.filter(d => d.craft_flg === draft);

  return (
    <div className="opcr-equipment-list">
      <div className="filters">
        <div className="filter-item">
          <span className="label">等级</span>
          <Radio.Group onChange={e => setLevel(e.target.value)} value={level}>
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
            <Radio value={5}>5</Radio>
            <Radio value={0}>全部</Radio>
          </Radio.Group>
        </div>
        <div className="filter-item">
          <span className="label">类型</span>
          <Radio.Group onChange={e => setDraft(e.target.value)} value={draft}>
            <Radio value={1}>装备</Radio>
            <Radio value={0}>碎片</Radio>
            <Radio value={-1}>全部</Radio>
          </Radio.Group>
        </div>
      </div>

      {dummy.map((eq, index) => <Equipment key={index} id={eq.id} />)}
    </div>
  );
}

export default Equipments;
