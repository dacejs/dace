import notifier from 'node-notifier';

/**
 * 在 mac 电脑上显示提示框
 */
export default message => notifier.notify({
  title: '🍭 UNJS',
  icon: false,
  message
});
