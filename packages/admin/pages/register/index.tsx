import React, { useCallback, useState } from 'react';
import { Form, Button, Input, Icon, Modal } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import { FormComponentProps } from 'antd/es/form';
import { UserProvider } from '@providers/user';
import style from './index.module.scss';

interface IProps extends FormComponentProps {}

const _Register: React.FC<IProps> = ({ form }) => {
  const { getFieldDecorator } = form;
  const [loading, setLoading] = useState(false);

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const submit = useCallback(e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        UserProvider.register(values)
          .then(() => {
            Modal.confirm({
              title: '注册成功',
              content: '是否跳转至登录?',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                Router.push('/login');
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          })
          .catch(e => setLoading(false));
      }
    });
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h2>访客注册</h2>
        <Form onSubmit={submit}>
          <Form.Item hasFeedback label="账户">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                autoComplete={'off'}
                size="large"
                placeholder="请输入用户名"
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback label="密码">
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码！' },

                {
                  validator: validateToNextPassword,
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                autoComplete={'off'}
                type="password"
                size="large"
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback label="确认密码">
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: '请再次输入密码！' },

                {
                  validator: compareToFirstPassword,
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                autoComplete={'off'}
                type="password"
                size="large"
                placeholder="请再次输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: '100%' }}
              loading={loading}
              disabled={loading}
            >
              注册
            </Button>
            Or{' '}
            <Link href="/login">
              <a>去登录</a>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Form.create<IProps>({ name: 'register' })(_Register);
