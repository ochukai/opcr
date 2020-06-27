import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import ranks from '../../assets/json/rank.json';
import units from '../../assets/json/unit.json';
import { Card, Row, Col, Divider } from 'antd';
import Equipment from '../../components/equip/Equipment';
import Unit from '../../components/unit/Unit';

import './unitDetail.less';

function UnitDetail() {
  const { id } = useParams();

  const idNum = parseInt(id);
  const myRanks = ranks.filter(r => r.id === idNum);
  const me = units.filter(u => u.id === idNum)[0];
  const defaultId = 999999;

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
      <div className="outer-rank-wrapper">
        {
          myRanks.map((mr, index) => {``
            return (
              <div className="rank-wrapper">
                <span className="rank">RANK{mr.rank}</span>
                <div className="rank-item eq1">
                  <Equipment size={48} id={mr.id1 || defaultId} />
                </div>
                <div className="rank-item eq2">
                  <Equipment size={48} id={mr.id2 || defaultId} />
                </div>
                <div className="rank-item eq3">
                  <Equipment size={48} id={mr.id3 || defaultId} />
                </div>
                <div className="rank-item eq4">
                  <Equipment size={48} id={mr.id4 || defaultId} />
                </div>
                <div className="rank-item eq5">
                  <Equipment size={48} id={mr.id5 || defaultId} />
                </div>
                <div className="rank-item eq6">
                  <Equipment size={48} id={mr.id6 || defaultId} />
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default UnitDetail;
