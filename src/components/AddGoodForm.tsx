import React from 'react';
import { colors } from '../api/colors';
import { getColorById } from '../helpers';

type Props = {
  goods: GoodWithColor[];
  addNewGood: (newGood: GoodWithColor) => void;
};

type State = {
  newGoodName: string;
  selectedColorId: number;
  hasNameError: boolean;
  hasColorError: boolean;
};

export class AddGoodForm extends React.Component<Props, State> {
  state: State = {
    newGoodName: '',
    selectedColorId: 0,
    hasNameError: false,
    hasColorError: false,
  };

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newGoodName: event.target.value,
      hasNameError: false,
    });
  };

  handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedColorId: +event.target.value,
      hasColorError: false,
    });
  };

  getNewGood = () => {
    const { newGoodName, selectedColorId } = this.state;
    const { goods } = this.props;

    const newGood: GoodWithColor = {
      id: goods.length + 1,
      name: newGoodName,
      colorId: selectedColorId,
      color: getColorById(selectedColorId) || null,
    };

    return newGood;
  };

  clearState = () => {
    this.setState({
      newGoodName: '',
      selectedColorId: 0,
      hasColorError: false,
      hasNameError: false,
    });
  };

  validateForm = () => {
    const { newGoodName, selectedColorId } = this.state;

    if (!newGoodName || !selectedColorId) {
      this.setState({
        hasNameError: !newGoodName,
        hasColorError: !selectedColorId,
      });

      return false;
    }

    return true;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = this.validateForm();

    if (isFormValid) {
      const newGood = this.getNewGood();

      this.props.addNewGood(newGood);
      this.clearState();
    }
  };

  render() {
    const {
      newGoodName, selectedColorId, hasNameError, hasColorError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <section>
          <input
            type="text"
            value={newGoodName}
            onChange={this.handleNameChange}
          />
          {hasNameError && (
            <span>Please enter a name</span>
          )}
        </section>

        <section>
          <select
            value={selectedColorId}
            onChange={this.handleColorChange}
          >
            <option value="0">Choose a color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>{color.name}</option>
            ))}
          </select>
          {hasColorError && (
            <span>Please choose a color</span>
          )}
        </section>

        <button type="submit">Add</button>
      </form>
    );
  }
}
