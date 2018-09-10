import React from 'react';
import { Link, Head } from 'dace';

const isEmbed = typeof window !== 'undefined' && window.location.pathname.startsWith('/mis/');

const renderTitle = () => {
  // 内嵌到活动页时不修改页面标题
  if (isEmbed) {
    return null;
  }
  return (
    <Head>
      <title>酒店列表</title>
    </Head>
  );
};

const renderDetailLink = () => {
  if (isEmbed) {
    return <a href="https://touch.qunar.com/hotel/detail">detail</a>;
  }
  return <Link to="/detail">detail</Link>;
};

export default () => (
  <div>
    {renderTitle()}
    <h1>list</h1>
    {renderDetailLink()}
  </div>
);
