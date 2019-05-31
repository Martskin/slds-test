import PropTypes from "prop-types"
import React from "react"
import tokens from "../../data/tokens"
import { css } from "@emotion/core"
import ShoppinListItem from './shoppingListItem'
import cartLogo from "../../images/cart-logo.png"

class ShoppingList extends React.Component {
  static Item = ShoppinListItem;

  constructor(props) {
    super(props);
    this.state = {
      dynamicItems: [],
      inputHeading: '',
      inputDescription: '',
      hasError: false,
    };
    this.handleButtonAddClick = this.handleButtonAddClick.bind(this);
    this.handleNewHeadingChange = this.handleNewHeadingChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleButtonAddClick() {
    if (this.state.inputHeading) {
      let newItem = [ { heading: this.state.inputHeading, description: this.state.inputDescription } ];
      let newDynamicItemArray = newItem.concat(this.state.dynamicItems);
      this.setState(
        {
          dynamicItems: newDynamicItemArray,
          inputHeading: '',
          inputDescription: '',
          hasError: false,
        }
      );
    } else {
      this.setState({ hasError: true });
    }
  }

  handleNewHeadingChange(event) {
    this.setState({ inputHeading: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ inputDescription: event.target.value });
  }

  renderDynamicItems() {
    return this.state.dynamicItems.map((item, index) => {
      return <ShoppinListItem key={index} {...item} />;
    });
  }

  render() {
    const { hasError } = this.state;
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
          padding: 0,
        })}
      >
        <div
          css={css({
            alignItems: 'center',
            display: 'flex',
            fontSize: tokens.font.size.lg,
            padding: tokens.space.md,
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
            backgroundColor: tokens.color.background.light,
            borderTop: tokens.border.component,
            padding: tokens.space.sm,
          })}
        >
          <div>
            <input
              css={css({
                fontSize: tokens.font.size.xs,
                marginRight: tokens.space.sm,
                padding: tokens.space.xxs,
              })}
              type="text"
              placeholder="Enter Heading"
              value={this.state.inputHeading}
              onChange={this.handleNewHeadingChange}
            />
            <input
              css={css({
                fontSize: tokens.font.size.xs,
                marginRight: tokens.space.sm,
                padding: tokens.space.xxs,
              })}
              type="text"
              placeholder="Enter Description"
              value={this.state.inputDescription}
              onChange={this.handleDescriptionChange}
            />
            <button
              css={css({
                background: 'transparent',
                border: 'none',
                color: tokens.color.text.success,
                cursor: 'pointer',
                display: 'inline-block',
                font: 'inherit',
                fontSize: tokens.font.size.sm,
                fontWeight: 'bold',
                margin: 0,
                overflow: 'visible',
                padding: 0,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                width: 'auto',
                '&:hover': {
                  textDecoration: 'underline',
                }
              })}
              onClick={this.handleButtonAddClick}
            >
              + Add
            </button>
          </div>
          {hasError && (
            <div
              css={css({
                color: tokens.color.text.error,
                fontSize: tokens.font.size.xs,
                paddingTop: tokens.space.sm,
              })}
            >
              A heading is required to add an item!
            </div>
          )}
        </div>
        {this.renderDynamicItems()}
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
              {children}
            </tbody>
          </table>
        ) : (
          <div>
            Sorry
          </div>
        )}
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
