import React from 'react';

import quests from '../../assets/json/quest.json';

import { Divider, List, Table, Tag } from 'antd';

import './quests.less';
import Quest from './Quest';
import Equipment from '../../components/equip/Equipment';

interface IEquipMap {
  id: number;
  name: string;
  maps: string[];
};

function parseNormalMaps(maps: Array<any>) {
  const equips: IEquipMap[] = [];
  maps.forEach((map: any) => {
    const { id1, name1, id2, name2 } = map;
    const eq1 = equips.filter(e => e.id === id1)[0];
    if (eq1) {
      eq1.maps.push(map.areaNo);
    } else {
      equips.push({
        id: id1,
        name: name1,
        maps: [map.areaNo]
      });
    }

    const eq2 = equips.filter(e => e.id === id2)[0];
    if (eq2) {
      eq2.maps.push(map.areaNo);
    } else {
      equips.push({
        id: id2,
        name: name2,
        maps: [map.areaNo]
      });
    }
  });

  return equips;
}

function renderEquipMaps(equips: IEquipMap[]) {
  const columns = [
    {
      title: '-',
      dataIndex: 'id',
      width: 80,
      key: 'id',
      render: (id: number) => <Equipment size={48} id={id} />
    },
    {
      title: '装备',
      dataIndex: 'name',
      width: 220,
      key: 'name',
    },
    {
      title: '地图',
      dataIndex: 'maps',
      key: 'maps',
      render: (maps: string[]) => {
        const ids = [5, 6, 7, 8, 9, 12];
        return (
          <div className="equip-maps-no">
            {maps.map((m: string, i) => <Tag key={i} color="#2db7f5">{m}</Tag>)}
          </div>
        );
      }
    }
  ];

  return <Table size="small" bordered={true} pagination={false} dataSource={equips} columns={columns} />;
}

function Area(props: any) {
  const { title } = props;
  const maps: Array<any> = (quests as any)[title];
  const normalMaps = maps.filter(map => map.type === 11);
  const hardMaps = maps.filter(map => map.type === 12);
  const equips = parseNormalMaps(normalMaps);
  const equipMaps = renderEquipMaps(equips);

  return (
    <div className="opcr-area-wrapper">
      <h3>{title}</h3>
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={normalMaps}
        renderItem={item => (
          <List.Item>
            <Quest area={title} id={item.id} />
          </List.Item>
        )}
      />
      <Divider />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={hardMaps}
        renderItem={item => (
          <List.Item>
            <Quest area={title} id={item.id} />
          </List.Item>
        )}
      />
      <Divider>{title} 装备掉落汇总</Divider>
      {equipMaps}
    </div>
  );
}

export default Area;
