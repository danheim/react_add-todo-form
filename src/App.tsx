import React from 'react';
import { serverGoods } from './api/goods';
import { GoodsList } from './components/GoodsList';
import { getColorById } from './helpers';
import { AddGoodForm } from './components/AddGoodForm';

// 1 - Отобразить список товаров
// 2 - Добавление нового товара

const goodsWithColors: GoodWithColor[] = serverGoods.map(
  (good) => ({
    ...good,
    color: getColorById(good.colorId) || null,
  }),
);

type Props = {};
type State = {
  goods: GoodWithColor[];
};

export class App extends React.Component<Props, State> {
  state: State = {
    goods: [...goodsWithColors],
  };

  addNewGood = (newGood: GoodWithColor) => {
    this.setState((prevState) => ({
      goods: [...prevState.goods, newGood],
    }));
  };

  render() {
    const { goods } = this.state;

    return (
      <div>
        <h1>Add good form</h1>

        <AddGoodForm goods={goods} addNewGood={this.addNewGood} />
        <GoodsList goods={goods} />
      </div>
    );
  }
}
