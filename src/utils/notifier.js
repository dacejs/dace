import notifier from 'node-notifier';

export default message => notifier.notify({
  title: '🍭 UNJS',
  icon: false,
  message
});
