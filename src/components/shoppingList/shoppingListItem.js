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
          this.props.removeItem(this.state.quantity, (this.props.price * this.state.quantity).toFixed(2));
        }, 5000);
      }, 300);
    } else {
      this.setState({ isDismissing: false, isWaiting: false });
      clearTimeout(this.waitingTimout);
      clearTimeout(this.dismissingTimout);
    }
  }

  handleInputQuantityChange(event) {
    let itemQuantityTotal = parseFloat(event.target.value);
    if (itemQuantityTotal >= 0) {
      this.setState({ quantity: itemQuantityTotal });
      this.props.updateQuantity(itemQuantityTotal);
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
              backgroundColor: isWaiting ? tokens.color.background.light : tokens.color.background.white,
              borderTop: tokens.border.component,
              margin: 0,
              opacity: isWaiting ? 0 : 1,
              transition: isWaiting ? 'opacity 5s ease-out' : 'opacity .3s linear',
              '&:last-child': {
                borderBottom: tokens.border.component,
              },
              '&:hover': {
                backgroundColor: tokens.color.background.light,
              },
            })}
          >
            <td
              css={css({
                paddingBottom: isWaiting ? tokens.space.xxs : tokens.space.xs,
                paddingRight: tokens.space.xs,
                paddingTop: isWaiting ? tokens.space.xxs : tokens.space.xs,
                paddingLeft: 0,
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
                            <span css={css({ color: tokens.color.text.warning })}>On Backorder</span>
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
                            margin: 0,
                            overflow: 'visible',
                            padding: 0,
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            width: 'auto',
                            '&:hover': {
                              color: tokens.color.text.error,
                              textDecoration: 'underline',
                            }
                          })}
                          onClick={this.handleButtonDeleteClick}
                        >
                          remove
                        </button>
                    </div>
                  </div>
                </div>
              )}
              {isWaiting && (
                <button
                  css={css({
                    background: 'transparent',
                    border: 'none',
                    color: tokens.color.text.interactive.default,
                    cursor: 'pointer',
                    display: 'block',
                    font: 'inherit',
                    fontSize: tokens.font.size.sm,
                    marginLeft: tokens.space.sm,
                    overflow: 'visible',
                    padding: 0,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    width: 'auto',
                    '&:hover': {
                      color: tokens.color.text.success,
                      textDecoration: 'underline',
                    }
                  })}
                  onClick={this.handleButtonDeleteClick}
                >
                  undo
                </button>
              )}
            </td>
            <td
              css={css({
                color: tokens.color.text.tertiary,
                fontSize: tokens.font.size.sm,
                fontWeight: 'bold',
                paddingBottom: isWaiting ? tokens.space.xxs : tokens.space.xs,
                paddingRight: tokens.space.xs,
                paddingTop: isWaiting ? tokens.space.xxs : tokens.space.xs,
                paddingLeft: tokens.space.xs,
              })}
            >
              {!isWaiting && (
                <span
                  css={css({
                    opacity: isDismissing ? 0 : 1,
                    transition: 'opacity .3s ease-out',
                  })}
                >
                  ${(price * quantity).toFixed(2)}
                </span>
              )}
            </td>
            <td
              css={css({
                paddingBottom: isWaiting ? tokens.space.xxs : tokens.space.xs,
                paddingRight: tokens.space.xs,
                paddingTop: isWaiting ? tokens.space.xxs : tokens.space.xs,
                paddingLeft: tokens.space.xs,
              })}
            >
              {!isWaiting && (
                <span
                  css={css({
                    opacity: isDismissing ? 0 : 1,
                    transition: 'opacity .3s ease-out',
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
                </span>
              )}
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
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

ShoppingListItem.defaultProps = {
  inStock: true,
  name: undefined,
  description: undefined,
  price: 0,
  quantity: 1,
};

export default ShoppingListItem;
