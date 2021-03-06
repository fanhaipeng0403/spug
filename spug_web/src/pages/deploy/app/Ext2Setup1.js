/**
 * Copyright (c) OpenSpug Organization. https://github.com/openspug/spug
 * Copyright (c) <spug.dev@gmail.com>
 * Released under the MIT License.
 */
import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Switch, Col, Form, Select, Button, Input } from "antd";
import envStore from 'pages/config/environment/store';
import store from './store';

export default observer(function Ext2Setup1() {
  const info = store.deploy;
  return (
    <Form labelCol={{span: 6}} wrapperCol={{span: 14}}>
      <Form.Item required label="发布环境">
        <Col span={16}>
          <Select value={info.env_id} onChange={v => info.env_id = v} placeholder="请选择发布环境">
            {envStore.records.map(item => (
              <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6} offset={2}>
          <Link to="/config/environment">新建环境</Link>
        </Col>
      </Form.Item>
      <Form.Item label="发布审核">
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={info['is_audit']}
          onChange={v => info['is_audit'] = v}/>
      </Form.Item>
      <Form.Item label="结果通知" help="应用发布成功或失败结果通知">
        <Input addonBefore={(
          <Select
            value={info['rst_notify']['mode']} style={{width: 100}} onChange={v => info['rst_notify']['mode'] = v}>
            <Select.Option value="0">关闭</Select.Option>
            <Select.Option value="1">钉钉</Select.Option>
            <Select.Option value="2">Webhook</Select.Option>
          </Select>
        )}
               disabled={info['rst_notify']['mode'] === '0'}
               value={info['rst_notify']['value']}
               onChange={e => info['rst_notify']['value'] = e.target.value}
               placeholder="请输入"/>
      </Form.Item>
      <Form.Item wrapperCol={{span: 14, offset: 6}}>
        <Button
          type="primary"
          disabled={!info.env_id}
          onClick={() => store.page += 1}>下一步</Button>
      </Form.Item>
    </Form>
  )
})
