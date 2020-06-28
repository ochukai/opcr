import React, { useState } from 'react';
import _ from 'lodash';
import { Row, Col, Divider, Select, Button, Drawer, Space, Form, Table } from 'antd';

import Unit from '../../components/unit/Unit';
import Equipment from '../../components/equip/Equipment';

import equipments from '../../assets/json/equipment.json';
import ranks from '../../assets/json/rank.json';
import units from '../../assets/json/unit.json';
import './equipCalc.less';

const { Option } = Select;
const rankStages = [
  '7-3',
  '7-5',
  '7-6',
  '8-3',
  '8-5',
  '8-6',
  '9-3',
  '9-5',
  '9-6',
  '10-3',
  '10-5',
  '10-6',
];

interface IUnitRange {
  id: number;
  start: string;
  end: string
};

interface IEquipCount {
  id: number;
  count: number;
};

interface IUnitEquip {
  id: number;
  equips: IEquipCount[];
}

interface IUnitEquipDetail {
  units: IUnitEquip[];
  equips: IEquipCount[];
}

let globalEquips: IUnitEquipDetail = {
  units: [],
  equips: [],
};

function renderDrawer(visible: boolean, onClose: any) {
  if (!visible || globalEquips.units.length === 0) {
    return;
  }

  const columns = [
    {
      title: '人物',
      dataIndex: 'id',
      key: 'id',
      width: 65,
      render: (id: number) => {
        return <Unit size={48} id={id} />
      }
    },
    {
      title: '装备',
      dataIndex: 'equips',
      key: 'equips',
      render: (equips: IEquipCount[]) => {
        return (
          <div key="equips" className="td-euqip-wrapper">
          {
            equips.map((eq, index) => {
              return (
                <div key={eq.id} className="td-equip-item">
                  <Equipment size={48} id={eq.id}/>
                  <span>✖</span>
                  <span className="count">{eq.count}</span>
                </div>
              );
            })
          }
          </div>
        );
      }
    },
  ];

  return (
    <Drawer
      title="需要装备数量"
      width={625}
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Table
        pagination={false}
        size="small"
        bordered={true}
        dataSource={globalEquips.units}
        columns={columns}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>汇总</Table.Summary.Cell>
            <Table.Summary.Cell index={1}>
              <div key="equips" className="td-euqip-wrapper">
              {
                globalEquips.equips.map((eq, index) => {
                  return (
                    <div key={index} className="td-equip-item">
                      <Equipment size={48} id={eq.id}/>
                      <span>✖</span>
                      <span className="count">{eq.count}</span>
                    </div>
                  );
                })
              }
              </div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </Drawer>
  );
}

function EquipmentCalc() {
  const defaultSelected: Array<IUnitRange> = [];
  const [selectedUnits, setSelectedUnits] = useState<Array<IUnitRange>>(defaultSelected);
  const [start, setStart] = useState('8-5');
  const [end, setEnd] = useState('9-3');
  const [drawerVisible, setVisible] = useState(false);

  const handleDrawerClose = () => {
    setVisible(false);
  };

  const handleCalcClick = () => {
    if (selectedUnits.length === 0) {
      return;
    }

    const units: IUnitEquip[] = [];
    let allEquips: number[] = [];
    selectedUnits.forEach(su => {
      const { id, start, end } = su;
      const suRanks = ranks.filter(r => r.id === id);

      const startArr = start.split('-');
      const endArr = end.split('-');
      const startRank = parseInt(startArr[0]);
      const startPos = parseInt(startArr[1]);
      const endRank = parseInt(endArr[0]);
      const endPos = parseInt(endArr[1]);

      if (startRank > endRank) {
        return;
      }

      const innnerEps: number[] = [];
      for (let i = startRank; i <= endRank; i ++) {
        const innerSp = i === startRank ? startPos : 0;
        const innerEp = i === endRank ? endPos: 6;
        if (innerSp === 6) {
          continue;
        }

        const sur = suRanks.filter(s => s.rank === i)[0];
        const { id1, id2, id3, id4, id5, id6 } = sur;
        // 0 3 5 6
        switch(innerSp) {
          case 0:
            if (innerEp === 3) {
              innnerEps.push(id2);
              innnerEps.push(id4);
              innnerEps.push(id6);
            }

            if (innerEp === 5) {
              innnerEps.push(id2);
              innnerEps.push(id3);
              innnerEps.push(id4);
              innnerEps.push(id5);
              innnerEps.push(id6);
            }

            if (innerEp === 6) {
              innnerEps.push(id1);
              innnerEps.push(id2);
              innnerEps.push(id3);
              innnerEps.push(id4);
              innnerEps.push(id5);
              innnerEps.push(id6);
            }

            break;

          case 3:
            if (innerEp === 5) {
              innnerEps.push(id3);
              innnerEps.push(id5);
            }

            if (innerEp === 6) {
              innnerEps.push(id1);
              innnerEps.push(id3);
              innnerEps.push(id5);
            }

            break;

          case 5:
            if (innerEp === 6) {
              innnerEps.push(id1);
            }

            break;
        }
      }

      // 每个人的装备都加进去，就是所有装备了呗
      allEquips = _.concat(allEquips, innnerEps);

      const counts = _.countBy(innnerEps);
      const equipCount: IEquipCount[] = Object
        .keys(counts)
        .map((key) => ({id: parseInt(key), count: counts[key]}));

      const unitEquip: IUnitEquip = {
        id,
        equips: _.sortBy(equipCount, e => -e.count)
      };

      units.push(unitEquip);
    });

    const allEquipsCount = _.countBy(allEquips);
    const equips: IEquipCount[] = Object
      .keys(allEquipsCount)
      .map((key) => ({id: parseInt(key), count: allEquipsCount[key]}));

    globalEquips.units = units;
    globalEquips.equips = _.sortBy(equips, e => -e.count);
    setVisible(true);
  };

  const handleValuesChange = (values: any) => {
    if (values.start) {
      setStart(values.start);
    }

    if (values.end) {
      setEnd(values.end);
    }
  };

  const handleClear = () => {
    setSelectedUnits([]);
  };

  return (
    <div className="opcr-equipment-calc">
      <Row>
        <Col flex="0 1 200px" style={{paddingLeft: 5}}>
          <h2>目标</h2>
          <Form initialValues={{ start, end }} onValuesChange={handleValuesChange}>
            <Space direction="vertical">
              <Form.Item name="start" label="从">
                <Select style={{ width: 150 }}>
                  {
                    rankStages.map((val, i) => <Option key={i} value={val}>{val}</Option>)
                  }
                </Select>
              </Form.Item>
              <Form.Item name="end" label="到">
                <Select style={{ width: 150 }}>
                  {
                    rankStages.map((val, i) => <Option key={i} value={val}>{val}</Option>)
                  }
                </Select>
              </Form.Item>
              <div>
                <Button type="primary" onClick={handleCalcClick}>计算</Button>
              </div>
              <div>
                {
                  selectedUnits.length > 0
                    ? <Button onClick={handleClear}>取消选择</Button>
                    : null
                }
              </div>
            </Space>
          </Form>
        </Col>

        <Col flex="1 1 300px">
          {
            units.map((unit, index) => {
              const checked = selectedUnits.filter(su => su.id === unit.id).length === 1;

              return (
                <Unit
                  key={index}
                  checkable={true}
                  checked={checked}
                  id={unit.id}
                  onClick={(item: any) => {
                    const old = selectedUnits.filter(su => su.id === item.id);
                    if (!old.length) {
                      const val = {
                        id: item.id,
                        start,
                        end
                      };

                      setSelectedUnits(selectedUnits.concat([ val ]));
                    } else {
                      setSelectedUnits(selectedUnits.filter(su => su.id !== item.id))
                    }
                  }}
                />
              );
            })
          }
        </Col>
      </Row>
      <Divider>↑ ↑ ↑ 选择 ↑ ↑ ↑</Divider>
      <Row>
        <Col>
        {
          selectedUnits.map((unit, index) => <Unit key={index} id={unit.id} />)
        }
        </Col>
      </Row>
      {renderDrawer(drawerVisible, handleDrawerClose)}
    </div>
  );

}

export default EquipmentCalc;
