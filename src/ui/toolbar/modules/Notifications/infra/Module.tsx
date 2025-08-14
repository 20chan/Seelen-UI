import { NotificationsToolbarItem } from '@seelen-ui/lib/types';
import { useWindowFocusChange } from '@shared/hooks';
import { Popover } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Item } from '../../item/infra/infra';

import { Selectors } from '../../shared/store/app';

import { RootState } from '../../shared/store/domain';

import { AnimatedPopover } from '../../../../shared/components/AnimatedWrappers';
import { ArrivalPreview } from './ArrivalPreview';
import { Notifications } from './Notifications';

interface Props {
  module: NotificationsToolbarItem;
}

export function NotificationsModule({ module }: Props) {
  const [openPreview, setOpenPreview] = useState(false);
  const count = useSelector((state: RootState) => Selectors.notifications(state).length);

  useWindowFocusChange((focused) => {
    if (!focused) {
      setOpenPreview(false);
    }
  });

  return (
    <Popover open={!openPreview} arrow={false} content={<ArrivalPreview />}>
      <AnimatedPopover
        animationDescription={{
          openAnimationName: 'notification-open',
          closeAnimationName: 'notification-close',
        }}
        open={openPreview}
        trigger="click"
        onOpenChange={setOpenPreview}
        content={<Notifications />}
      >
        <Item extraVars={{ count }} module={module} active={openPreview} />
      </AnimatedPopover>
    </Popover>
  );
}
