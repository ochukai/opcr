import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Select, Divider } from 'antd';
import _ from 'lodash';

import Equipment from '../../components/equip/Equipment';
import Unit from '../../components/unit/Unit';

import './unitDetail.less';

import ranks from '../../assets/json/rank.json';
import units from '../../assets/json/unit.json';

const { Option } = Select;

function UnitDetail() {
  const { id } = useParams();
  const [rank, setRank] = useState({ value: 8, label: 'RANK8' });

  const defaultId = 999999;
  const idNum = parseInt(id);
  const myRanks = ranks.filter(r => r.id === idNum);
  const me = units.filter(u => u.id === idNum)[0];
  const rankNumbers = myRanks.map(mr => ({ value: mr.rank, label: `RANK${mr.rank}` }));

  const rankData = myRanks.filter(mr => mr.rank === rank.value)[0];

  const handleRankChange = (value: any) => {
    console.log('handle rank change', value);
    setRank(value);
  };

  return (
    <div className="opcr-unit-detail">
      <div className="meta">
        <Unit id={idNum} size={100} />
        <div>
          <h2>{me.name}</h2>
          <p>年龄：{me.age}</p>
          <p>种族：{me.race}</p>
          <p>工会：{me.guild}</p>
        </div>
      </div>
      <Divider />
      <Select
        listHeight={480}
        labelInValue={true}
        value={rank as any}
        onChange={handleRankChange}
      >
        {
          rankNumbers.map(op => <Option value={op.value} key={op.value}>{op.label}</Option>)
        }
      </Select>

      <div className="outer-rank-wrapper">
        <div className="rank-wrapper">
          <span className="rank">{rank.label}</span>
          <div className="rank-item eq1">
            <Equipment size={64} id={rankData.id1 || defaultId} />
          </div>
          <div className="rank-item eq2">
            <Equipment size={64} id={rankData.id2 || defaultId} />
          </div>
          <div className="rank-item eq3">
            <Equipment size={64} id={rankData.id3 || defaultId} />
          </div>
          <div className="rank-item eq4">
            <Equipment size={64} id={rankData.id4 || defaultId} />
          </div>
          <div className="rank-item eq5">
            <Equipment size={64} id={rankData.id5 || defaultId} />
          </div>
          <div className="rank-item eq6">
            <Equipment size={64} id={rankData.id6 || defaultId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitDetail;
