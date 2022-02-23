import { notification } from 'antd';
import { IconType } from 'antd/lib/notification';
import React from 'react';

export const onOpenNotification = (message: string, description: React.ReactNode, type: IconType, duration?: number) => {
  notification.open({
    message: message,
    duration: (duration === undefined) ? 2 : duration,
    type: type,
    description: description,
  });
};