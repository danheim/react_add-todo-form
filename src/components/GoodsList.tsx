import React from 'react';

type Props = {
  goods: GoodWithColor[];
};

export const GoodsList: React.FC<Props> = (props) => {
  const { goods } = props;

  return (
    <ul>
      {goods.map((good) => (
        <li
          key={good.id}
          style={{ color: good.color?.name }}
        >
          {good.name}
        </li>
      ))}
    </ul>
  );
};
