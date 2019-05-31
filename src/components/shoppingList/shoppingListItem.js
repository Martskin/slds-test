import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import tokens from "../../data/tokens"
import { css } from "@emotion/core"

class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDismissing: false,
      isDismissed: false,
      isWaiting: false,
    };
    this.handleButtonDeleteClick = this.handleButtonDeleteClick.bind(this);
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

  render() {
    const { isDismissing, isDismissed, isWaiting } = this.state;
    const { isChecked, heading, description, children } = this.props;

    return (
      <Fragment>
        {!isDismissed && (
          <li
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
            <div
              css={css({
                alignItems: 'center',
                display: 'flex',
              })}
            >
              <div
                css={css({
                  flexGrow: 1,
                  paddingRight: tokens.space.sm,
                })}
              >
                {!isWaiting && (
                  <div
                    css={css({
                      opacity: isDismissing ? 0 : 1,
                      transition: 'opacity .3s ease-out',
                    })}
                  >
                    <label
                      css={css({
                        cursor: 'pointer',
                        display: 'block',
                        width: '100%',
                      })}
                    >
                      <input
                        css={css({
                          display: 'inline-block',
                          position: 'absolute',
                          marginLeft: '-23px',
                          marginTop: tokens.space.xxs,
                        })}
                        type="checkbox"
                        name={heading}
                        defaultChecked={isChecked}
                      />
                      <span
                        css={css({
                          display: 'inline-block',
                          fontSize: tokens.font.size.md,
                          fontWeight: 'bold',
                          margin: `0 0 ${tokens.space.xxs}px`,
                          'input:checked + &': {
                            textDecoration: 'line-through',
                          }
                        })}
                      >
                        {heading}
                      </span>
                      <div>
                          {description && (
                          <p
                            css={css({
                              margin: 0,
                              fontSize: tokens.font.size.sm,
                              '&:not(:last-child)': {
                                marginBottom: tokens.space.sm,
                              }
                            })}
                          >
                            {description}
                          </p>
                        )}
                        {children}
                      </div>
                    </label>
                  </div>
                )}
              </div>
              <div>
                <button
                  css={css({
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    display: 'block',
                    font: 'inherit',
                    fontSize: tokens.font.size.xs,
                    margin: 0,
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
                  {isWaiting ? 'Undo' : 'X Delete'}
                </button>
              </div>
            </div>
          </li>
        )}
      </Fragment>
    );
  }
}

ShoppingListItem.propTypes = {
  isChecked: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ShoppingListItem.defaultProps = {
  isChecked: false,
  heading: undefined,
  description: undefined,
  children: undefined,
};

export default ShoppingListItem;
