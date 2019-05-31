import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import tokens from "../../data/tokens"
import { css } from "@emotion/core"
import productDefaultImage from "../../images/product-default-image.jpg"

class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDismissing: false,
      isDismissed: false,
      isWaiting: false,
      quantity: this.props.quantity,
    };
    this.handleButtonDeleteClick = this.handleButtonDeleteClick.bind(this);
    this.handleInputQuantityChange = this.handleInputQuantityChange.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.waitingTimout);
    clearTimeout(this.dismissingTimout);
  }

  handleButtonDeleteClick() {
    if (!this.state.isWaiting) {
      this.setState({ isDismissing: true });
      this.waitingTimout = setTimeout(() => {
        this.setState({ isWaiting: true });
        this.dismissingTimout = setTimeout(() => {
          this.setState({ isDismissed: true });
        }, 5000);
      }, 300);
    } else {
      this.setState({ isDismissing: false, isWaiting: false });
      clearTimeout(this.waitingTimout);
      clearTimeout(this.dismissingTimout);
    }
  }

  handleInputQuantityChange(event) {
    let newQuantity = parseFloat(event.target.value);
    if (newQuantity >= 0) {
      this.setState({ quantity: newQuantity });
    }
  }

  render() {
    const { isDismissing, isDismissed, isWaiting, quantity } = this.state;
    const {
      inStock,
      name, 
      description,
      price
    } = this.props;

    return (
      <Fragment>
        {!isDismissed && (
          <tr
            css={css({
              borderTop: tokens.border.component,
              margin: 0,
              paddingBottom: tokens.space.xs,
              paddingLeft: tokens.space.lg,
              paddingRight: tokens.space.xs,
              paddingTop: tokens.space.xs,
              '&:hover': {
                backgroundColor: tokens.color.background.light,
              },
            })}
          >
            <td
              css={css({
                padding: `${tokens.space.xs}px ${tokens.space.xs}px ${tokens.space.xs}px 0`,
              })}
            >
              {!isWaiting && (
                <div
                  css={css({
                    display: 'flex',
                    opacity: isDismissing ? 0 : 1,
                    transition: 'opacity .3s ease-out',
                  })}
                >
                  <div>
                    <img
                      css={css({
                        marginRight: tokens.space.md,
                        height: 50,
                        width: 50,
                      })}
                      src={productDefaultImage}
                      alt={name}
                    />
                  </div>
                  <div>
                    <div
                      css={css({
                        color: tokens.color.text.secondary,
                        fontSize: tokens.font.size.md,
                        fontWeight: 'bold',
                        marginBottom: tokens.space.xxs,
                      })}
                    >
                      {name}
                    </div>
                    <div>
                        {description && (
                          <div
                            css={css({
                              color: tokens.color.text.tertiary,
                              margin: 0,
                              fontSize: tokens.font.size.xs,
                              marginBottom: tokens.space.xs,
                            })}
                          >
                            {description}
                          </div>
                        )}
                        <div
                          css={css({
                            color: tokens.color.text.tertiary,
                            margin: 0,
                            fontSize: tokens.font.size.xs,
                            marginBottom: tokens.space.xs,
                          })}
                        >
                          {inStock ? (
                            <span css={css({ color: tokens.color.text.success })}>In Stock</span>
                          ) : (
                            <span css={css({ color: tokens.color.text.warning })}>Backordered</span>
                          )}
                        </div>
                        <button
                          css={css({
                            background: 'transparent',
                            border: 'none',
                            color: tokens.color.text.interactive.default,
                            cursor: 'pointer',
                            display: 'block',
                            font: 'inherit',
                            fontSize: tokens.font.size.sm,
                            margin: `0 0 ${tokens.space.sm}`,
                            overflow: 'visible',
                            padding: 0,
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            width: 'auto',
                            '&:hover': {
                              color: isWaiting ? tokens.color.text.success : tokens.color.text.error,
                              textDecoration: 'underline',
                            }
                          })}
                          onClick={this.handleButtonDeleteClick}
                        >
                          {isWaiting ? 'undo' : 'remove'}
                        </button>
                    </div>
                  </div>
                </div>
              )}
            </td>
            <td
              css={css({
                color: tokens.color.text.tertiary,
                padding: tokens.space.xs,
                fontSize: tokens.font.size.sm,
                fontWeight: 'bold',
              })}
            >
              ${(price * quantity).toFixed(2)}
            </td>
            <td
              css={css({
                padding: tokens.space.xs,
              })}
            >
              <input
                css={css({
                  border: tokens.border.component,
                  borderRadius: tokens.border.radius.default,
                  fontSize: tokens.font.size.xs,
                  padding: tokens.space.xxs,
                  width: tokens.space.lg,
                })}
                min="1"
                type="number"
                defaultValue={quantity}
                onChange={this.handleInputQuantityChange}
              />
            </td>
          </tr>
        )}
      </Fragment>
    );
  }
}

ShoppingListItem.propTypes = {
  inStock: PropTypes.bool,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
};

ShoppingListItem.defaultProps = {
  inStock: true,
  name: undefined,
  description: undefined,
  price: 0.00,
  quantity: 1,
};

export default ShoppingListItem;
