import React from 'react';

const box = {
  weight: 2,
  getWeight() { return this.weight; }
};

const { getWeight } = box;

const bigBox = { weight: 10 };

export default () => (
  <div>
    <h1>{bigBox::getWeight()}</h1>
  </div>
);
