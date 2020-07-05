import React from 'react';

import { Timeline as ATL, Tag } from 'antd';

import './timeline.less';

function Timeline(props: any) {
  return (
    <div>
      <div style={{marginBottom: 40}}>
        <Tag color="#f8b500">黑骑</Tag>
        <Tag color="#f50">狼</Tag>
        <Tag color="#c9171e">黑骑</Tag>
        <Tag color="#2db7f5">狗</Tag>
        <Tag color="#108ee9">黑骑</Tag>
        <Tag color="#87d068">瞎子</Tag>
        <Tag color="#0aa344">黑骑</Tag>
        <Tag color="#9d5b8b">黑骑</Tag>
        <Tag color="#2c4f54">黑骑</Tag>
        <Tag color="#640125">黑骑</Tag>
      </div>

      <ATL mode={'left'}>
        <ATL.Item label="117" color="#f50">
          <Tag color="#f50">狼</Tag>
        </ATL.Item>
        <ATL.Item label="112" color="#87d068">
          <Tag color="#87d068">瞎子</Tag>
        </ATL.Item>
        <ATL.Item label="104" color="#f50">
          <Tag color="#f50">狼</Tag>
          <Tag color="#2db7f5">狗</Tag>
          <span>（可以贪狼的平a）</span>
        </ATL.Item>
        <ATL.Item label="058" color="#87d068">
          <Tag color="#87d068">瞎子</Tag>
        </ATL.Item>
        <ATL.Item label="052" color="#108ee9">
          <Tag color="#108ee9">黑骑</Tag>（破甲后开）
        </ATL.Item>
      </ATL>
    </div>
  );
}

export default Timeline;
