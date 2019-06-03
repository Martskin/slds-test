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
      items: [],
      subTotal: 0,
      cartEmpty: false,
    };
    this.updateItemTotalPrice = this.updateItemTotalPrice.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentWillMount() {
   this.initState();
  }

  componentDidMount() {
    this.calculateSubTotal();
  }

  componentWillUnmount() {
    clearTimeout(this.lastItemDismissingTimeout);
  }

  initState() {
    let { items } = this.state;
    React.Children.map(this.props.children, child => {
      let itemObject = {
        upc: child.props.upc,
        price: child.props.price,
      };
      items = items.concat( itemObject );
      this.setState({ items });
    });
  }

  renderItems(children) {
    return React.Children.map(children, child => {
      return (
        <ShoppinListItem
          key={this.props.upc}
          updateItemTotalPrice={this.updateItemTotalPrice}
          removeItem={this.removeItem}
          variant={this.props.variant}
          {...child.props}
        />
      );
    });
  }

  calculateSubTotal() {
    let { items } = this.state;
    let subTotal = 0;
    if (items.length) {
      for (let i = 0; i < items.length; i++) {
        subTotal = subTotal + items[i].price;
        this.setState({ subTotal: subTotal });
      }
    } else {
      this.setState({ subTotal: subTotal });
      this.lastItemDismissingTimeout = setTimeout(() => {
        this.setState({ cartEmpty: true });
      }, 5000);
    }
  }

  updateItemTotalPrice(upc, itemPriceTotal) {
    let { items } = this.state;
    let index = items.findIndex(i => i.upc === upc);
    clearTimeout(this.lastItemDismissingTimeout);
    if (items[index]) {
      items[index].price = itemPriceTotal;
      this.setState({ items }, () => {
        this.calculateSubTotal();
      });
    } else {
      let itemObject = {
        upc: upc,
        price: itemPriceTotal,
      };
      items = items.concat( itemObject );
      this.setState({ items }, () => {
        this.calculateSubTotal();
      });
    }
  }

  removeItem(upc) {
    let { items } = this.state;
    let index = items.findIndex(i => i.upc === upc);
    items.splice(index, 1);
    this.setState({ items });
    this.calculateSubTotal();
  }

  render() {
    const { items, subTotal, cartEmpty } = this.state;
    const { heading, variant, children } = this.props;

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
            display: variant === 'narrow' ? 'block' : 'flex',
            marginBottom: tokens.space.md,
          })}
        >
          <div
            css={css({
              borderRight: variant === 'narrow' ? 'none' : tokens.border.component,
              paddingBottom: tokens.space.md,
              paddingLeft: 0,
              paddingRight: variant === 'narrow' ? 0 : tokens.space.md,
              paddingTop: tokens.space.md,
              width: variant === 'narrow' ? 'auto' : '60%',
            })}
          >
            {!cartEmpty ? (
              <table
                css={css({
                  borderCollapse: 'collapse',
                  width: '100%',
                })}
              >
                {variant === 'default' && (
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
                          width: '15%',
                          textAlign: 'right',
                        })}
                      >
                        Price
                      </td>
                      <td
                        css={css({
                          padding: tokens.space.xs,
                          width: '15%',
                          textAlign: 'center',
                        })}
                      >
                        Quantity
                      </td>
                    </tr>
                  </thead>
                )}
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
              paddingLeft: variant === 'narrow' ? 0 : tokens.space.md,
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
              Subtotal ({items.length} item{ items.length > 1 ? 's' : null}) ${subTotal.toLocaleString('en', {useGrouping:true, minimumFractionDigits: 2})}
            </div>
            <button
              css={css({
                background: items.length <= 0 ? tokens.color.background.interactive.disabled : tokens.color.background.interactive.default,
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
                pointerEvents: items.length <= 0 ? 'none' : 'initial',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                width: variant === 'narrow' ? '100%' : 'auto',
                '&:hover': {
                  background: tokens.color.background.interactive.hover,
                  color: tokens.color.text.onInteractive,
                }
              })}
              disabled={items.length <= 0}
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
  variant: PropTypes.oneOf(['default', 'narrow']),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

ShoppingList.defaultProps = {
  heading: undefined,
  variant: 'default',
  children: undefined
}

export default ShoppingList
