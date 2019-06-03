import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import tokens from "../../data/tokens"
import { css } from "@emotion/core"
import productDefaultImage from "../../images/product-default-image.png"

class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDismissing: false,
      isDismissed: false,
      isWaiting: false,
      quantity: this.props.quantity,
      price: this.props.price,
    };
    this.handleButtonDeleteClick = this.handleButtonDeleteClick.bind(this);
    this.handleInputQuantityChange = this.handleInputQuantityChange.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.waitingTimout);
    clearTimeout(this.dismissingTimout);
  }

  handleButtonDeleteClick() {
    const { quantity, price } = this.state;
    const upc = this.props.upc;
    if (!this.state.isWaiting) {
      this.setState({ isDismissing: true });
      this.waitingTimout = setTimeout(() => {
        this.setState({ isWaiting: true });
        this.props.removeItem(upc);
        this.dismissingTimout = setTimeout(() => {
          this.setState({ isDismissed: true });
        }, 5000);
      }, 300);
    } else {
      this.setState({ isDismissing: false, isWaiting: false });
      clearTimeout(this.waitingTimout);
      clearTimeout(this.dismissingTimout);
      this.props.updateItemTotalPrice(upc, (price * quantity));
    }
  }

  handleInputQuantityChange(event) {
    const itemQuantityTotal = parseFloat(event.target.value);
    const itemPriceTotal = parseFloat((this.state.price * itemQuantityTotal).toFixed(2));
    const upc = this.props.upc;
    if (itemQuantityTotal >= 0) {
      this.setState({ quantity: itemQuantityTotal });
      this.props.updateItemTotalPrice(upc, itemPriceTotal);
    }
  }

  render() {
    const { isDismissing, isDismissed, isWaiting, quantity } = this.state;
    const {
      variant,
      inStock,
      upc,
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
              verticalAlign: 'top',
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
                        color: tokens.color.text.tertiary,
                        fontSize: tokens.font.size.xxs,
                      })}
                    >
                      {upc}
                    </div>
                    <div
                      css={css({
                        color: tokens.color.text.secondary,
                        fontSize: variant === 'narrow' ? tokens.font.size.sm : tokens.font.size.md,
                        fontWeight: 'bold',
                        marginBottom: tokens.space.xxs,
                        maxWidth: variant === 'narrow' ? '140px' : 'none',
                        overflow: variant === 'narrow' ? 'hidden' : 'initial',
                        textOverflow: variant === 'narrow' ? 'ellipsis' : 'none',
                        whiteSpace: variant === 'narrow' ? 'nowrap' : 'initial',
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
                        {variant === 'default' && (
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
                        )}
                    </div>
                  </div>
                </div>
              )}
              {isWaiting && (
                <div>
                  <button
                    css={css({
                      background: 'transparent',
                      border: 'none',
                      color: tokens.color.text.interactive.default,
                      cursor: 'pointer',
                      display: 'inline-block',
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
                  <span
                    css={css({
                      color: tokens.color.text.tertiary,
                      display: 'inline-block',
                      fontSize: tokens.font.size.xxs,
                      marginLeft: tokens.space.sm,
                      verticalAlign: 'middle',
                    })}
                  >
                    ({name})
                  </span>
                </div>
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
                textAlign: 'right',
              })}
            >
              {!isWaiting && (
                <span
                  css={css({
                    opacity: isDismissing ? 0 : 1,
                    transition: 'opacity .3s ease-out',
                  })}
                >
                  ${(price * quantity).toLocaleString('en', {useGrouping:true, minimumFractionDigits: 2})}
                </span>
              )}
            </td>
            {variant === 'narrow' && (
              <td
                css={css({
                  fontSize: tokens.font.size.sm,
                  paddingBottom: isWaiting ? tokens.space.xxs : tokens.space.xs,
                  paddingRight: tokens.space.xs,
                  paddingTop: isWaiting ? tokens.space.xxs : tokens.space.xs,
                  paddingLeft: tokens.space.xs,
                })}
              >
                {!isWaiting && (
                  <button
                    css={css({
                      background: tokens.color.background.interactive.default,
                      borderRadius: tokens.border.radius.default,
                      border: 'none',
                      color: tokens.color.text.onInteractive,
                      cursor: 'pointer',
                      display: 'block',
                      font: 'inherit',
                      fontSize: tokens.font.size.md,
                      fontWeight: 'bold',
                      height: tokens.space.lg,
                      lineHeight: 0,
                      margin: 0,
                      overflow: 'visible',
                      padding: 0,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      width: tokens.space.lg,
                      '&:hover': {
                        background: tokens.color.background.interactive.hover,
                        color: tokens.color.text.onInteractive,
                      }
                    })}
                    onClick={this.handleButtonDeleteClick}
                    aria-label="remove this item from cart"
                  >
                    X
                  </button>
                )}
              </td>
            )}
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
                      display: 'block',
                      fontSize: tokens.font.size.xs,
                      margin: '0 auto',
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
  upc: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

ShoppingListItem.defaultProps = {
  inStock: true,
  upc: 0,
  name: undefined,
  description: undefined,
  price: 0,
  quantity: 1,
};

export default ShoppingListItem;
