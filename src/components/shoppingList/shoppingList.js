import PropTypes from "prop-types"
import React from "react"
import tokens from "../../data/tokens"
import { css } from "@emotion/core"
import ShoppinListItem from './shoppingListItem'
import cartLogo from "../../images/cart-logo.png"
import emptyCartImage from "../../images/empty-cart-image.jpg"

class ShoppingList extends React.Component {
  static Item = ShoppinListItem;

  constructor(props) {
    super(props);
    this.state = {
      itemQuantity: this.props.children.length,
      subTotal: 0,
    };
    this.updateQuantity = this.updateQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
   this.calculateSubTotal();
  }

  calculateSubTotal() {
    let { subTotal } = this.state;
    React.Children.map(this.props.children, child => {
      subTotal = subTotal + child.props.price;
    });
    this.setState({ subTotal: subTotal });
  }

  renderItems(children) {
    return React.Children.map(children, child => {
      return (
        <ShoppinListItem
          updateQuantity={this.updateQuantity}
          removeItem={this.removeItem}
          {...child.props}
        />
      );
    });
  }

  updateQuantity(itemQuantityTotal) {
    let { itemQuantity } = this.state;
    let newItemQuantity = itemQuantity;
    console.log(newItemQuantity, itemQuantity, itemQuantityTotal);
    // newItemQuantity = (newItemQuantity + newQuantity) - 1;
    // console.log(itemQuantityTotal, newItemQuantity);
    this.setState({ itemQuantity: (itemQuantity + 1) });
  }

  removeItem(itemQuantityTotal, itemPriceTotal) {
    let { itemQuantity } = this.state;
    // let newItemQuantity = itemQuantity;
    // console.log(newItemQuantity, itemQuantity, newQuantity);
    // newItemQuantity = (newItemQuantity + newQuantity) - 1;
    // console.log(newQuantity, newItemQuantity);
    this.setState({ itemQuantity: itemQuantity - itemQuantityTotal });
  }

  render() {
    const { itemQuantity, subTotal } = this.state;
    const { heading, children } = this.props;

    return (
      <div
        css={css({
          border: tokens.border.component,
          borderRadius: tokens.border.radius.default,
          boxShadow: tokens.shadow.default,
          color: tokens.color.text.default,
          fontFamily: tokens.font.family.sansSerif,
          marginBottom: tokens.space.md,
          overflow: 'hidden',
          padding: tokens.space.md,
        })}
      >
        <div
          css={css({
            alignItems: 'center',
            display: 'flex',
            fontSize: tokens.font.size.lg,
            marginBottom: tokens.space.md,
          })}
        >
          <img
            css={css({
              marginRight: tokens.space.md,
              height: 24,
              width: 24,
            })}
            src={cartLogo}
            alt="CART Logo"
          />
          {heading && (
            <div>{heading}</div>
          )}
        </div>
        <div
          css={css({
            display: 'flex',
            marginBottom: tokens.space.md,
          })}
        >
          <div
            css={css({
              borderRight: tokens.border.component,
              paddingBottom: tokens.space.md,
              paddingLeft: 0,
              paddingRight: tokens.space.md,
              paddingTop: tokens.space.md,
              width: '60%',
            })}
          >
            {children ? (
              <table
                css={css({
                  borderCollapse: 'collapse',
                  width: '100%',
                })}
              >
                <thead>
                  <tr
                    css={css({
                      color: tokens.color.text.tertiary,
                      fontSize: tokens.font.size.sm,
                      verticalAlign: 'top',
                    })}
                  >
                    <td
                      css={css({
                        padding: tokens.space.xs,
                      })}
                    >
                      Product
                    </td>
                    <td
                      css={css({
                        padding: tokens.space.xs,
                      })}
                    >
                      Price
                    </td>
                    <td
                      css={css({
                        padding: tokens.space.xs,
                      })}
                    >
                      Quantity
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {this.renderItems(children)}
                </tbody>
              </table>
            ) : (
              <div
                css={css({
                  marginBottom: tokens.space.md,
                })}
              >
                <img
                  css={css({
                    display: 'block',
                    marginBottom: tokens.space.xs,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 0,
                    height: 'auto',
                    maxWidth: '100%',
                  })}
                  src={emptyCartImage}
                  alt="Rainy camping trip"
                />
                <div
                  css={css({
                    fontSize: tokens.font.size.lg,
                    marginBottom: tokens.space.lg,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 0,
                    maxWidth: 264,
                    textAlign: 'center',
                  })}
                >
                  There are currenlty no items in your shopping cart
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
                    marginBottom: tokens.space.md,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 0,
                    overflow: 'visible',
                    padding: 0,
                    textAlign: 'center',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    width: 'auto',
                    '&:hover': {
                      color: tokens.color.text.interactive.hover,
                      textDecoration: 'underline',
                    }
                  })}
                  onClick={this.handleButtonDeleteClick}
                >
                  Continue shopping?
                </button>
              </div>
            )}
          </div>
          <div
            css={css({
              paddingBottom: tokens.space.md,
              paddingLeft: tokens.space.md,
              paddingRight: 0,
              paddingTop: tokens.space.md,
            })}
          >
            <div
              css={css({
                fontSize: tokens.font.size.lg,
                marginBottom: tokens.space.md,
              })}
            >
              Subtotal ({itemQuantity} items) ${subTotal.toFixed(2)}
            </div>
            <button
              css={css({
                background: itemQuantity <= 0 ? tokens.color.background.interactive.disabled : tokens.color.background.interactive.default,
                borderRadius: tokens.border.radius.default,
                border: 'none',
                color: tokens.color.text.onInteractive,
                cursor: 'pointer',
                display: 'block',
                font: 'inherit',
                fontSize: tokens.font.size.md,
                lineHeight: 1,
                margin: 0,
                overflow: 'visible',
                padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                pointerEvents: itemQuantity <= 0 ? 'none' : 'initial',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                width: 'auto',
                '&:hover': {
                  background: tokens.color.background.interactive.hover,
                  color: tokens.color.text.onInteractive,
                }
              })}
              disabled={itemQuantity <= 0}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

ShoppingList.defaultProps = {
  heading: undefined,
  children: undefined
}

export default ShoppingList
