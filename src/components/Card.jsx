import React from 'react'
import './Card.css'
import Button from './Button'

const NO_IMAGE_TYPES = new Set(['no-image', 'no-image-link'])

/**
 * Card — synced from Figma node 7:3904 (file asvaeYj4SwE9iBsdlehuzf).
 *
 * Figma variant axes:
 *   - Type:        default | no-image | no-image-link | link
 *   - Orientation: portrait | landscape
 *   - Alignment:   left | center
 *
 * Figma boolean slot properties: Image, Subtitle-top, Title, Subtitle-bottom,
 * Description, Button.
 */
export default function Card({
  type = 'default', // default | no-image | no-image-link | link
  orientation = 'portrait', // portrait | landscape
  alignment = 'left', // left | center

  // Figma boolean slot properties
  showImage = true,
  showSubtitleTop = true,
  showTitle = true,
  showSubtitleBottom = true,
  showDescription = true,
  showButton = true,

  // Content slots
  imageSrc = null,
  imageAlt = '',
  subtitleTop = 'Subtitle',
  title = 'Card title',
  subtitleBottom = 'Subtitle',
  description = 'Lorem ipsum dolor sit amet, consectur adipiscing elit, sed do eiusmond tempor incidunt.',
  footerText = null,

  // CTA (Figma: Button / Rounded / Medium or Link with CTA/Large label)
  buttonLabel = 'Learn more',
  buttonLeadingIcon = 'chevron_left',
  buttonTrailingIcon = 'chevron_right',
  linkHref = '#',
  onButtonClick,

  className = '',
  ...rest
}) {
  const isNoImage = NO_IMAGE_TYPES.has(type)
  const hasImage = showImage && !isNoImage
  const isLinkType = type === 'link' || type === 'no-image-link'

  const classes = [
    'card',
    `card--${type}`,
    `card--${orientation}`,
    `card--${alignment}`,
    className,
  ]

  return (
    <article className={classes.filter(Boolean).join(' ')} {...rest}>
      {/* Figma slot: image (240x180 portrait / 240x280 landscape) */}
      {hasImage && (
        <div className="card__image">
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt} />
          ) : (
            <span className="card__image-placeholder material-symbols-rounded" aria-hidden="true">
              image
            </span>
          )}
        </div>
      )}

      {/* Figma slot: text + CTA column (Figma Group 1 / Frame 1) */}
      <div className="card__body">
        {/* Figma slot: text (subtitle-top, heading/H4, subtitle-bottom, body) */}
        <div className="card__text">
          {(showSubtitleTop || showTitle || showSubtitleBottom) && (
            <div className="card__header">
              {showSubtitleTop && <p className="card__subtitle">{subtitleTop}</p>}
              {showTitle && <h4 className="card__title">{title}</h4>}
              {showSubtitleBottom && <p className="card__subtitle">{subtitleBottom}</p>}
            </div>
          )}
          {showDescription && <p className="card__body">{description}</p>}
          {isNoImage && footerText != null && footerText !== '' && (
            <p className="card__footer">{footerText}</p>
          )}
        </div>

        {/* Figma slot: button / link */}
        {showButton && (
          <div className="card__actions">
            {isLinkType ? (
              <a className="card__link" href={linkHref} onClick={onButtonClick}>
                {buttonLabel}
              </a>
            ) : (
              <Button
                variant="confirm-primary"
                size="medium"
                leadingIcon={buttonLeadingIcon || undefined}
                trailingIcon={buttonTrailingIcon || undefined}
                iconColor="white"
                onClick={onButtonClick}
                className="card__btn"
              >
                {buttonLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
